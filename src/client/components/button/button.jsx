import React, { useRef } from 'react';
import propTypes from 'prop-types';
import { debounce } from 'throttle-debounce';
import './button.styl';

const Button = function ({
  children,
  disabled = false,
  action,
  style,
  type = '',
  icon,
  iconSide = 'left',
  isCircle = false,
  additionalClass = '',
}) {
  const bttnRef = useRef(null);
  const debounceAction = debounce(200, evt => action(evt));
  const createRipple = (evt) => {
    const btn = bttnRef.current;
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const boundingBox = btn.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${evt.clientX - (boundingBox.x + radius)}px`;
    circle.style.top = `${evt.clientY - (boundingBox.y + radius)}px`;
    circle.classList.add('ripple');

    setTimeout(() => {
      circle.remove();
    }, 601); // that is the time we set in the css for the ripple effect

    btn.appendChild(circle);

    if (action && action instanceof Function) {
      debounceAction(evt);
    }
  };

  return (
    <div className={`button-wrap ${additionalClass}`} style={style}>
      <button
        className={`button ${type} ${disabled ? 'disabled' : ''} ${isCircle ? 'circle' : ''}`}
        onClick={createRipple} 
        disabled={disabled}
        ref={bttnRef}
      >
        {(icon && iconSide === 'left') && <img src={icon} />}
        {children}
        {(icon && iconSide === 'right') && <img src={icon} />}
      </button>
    </div>
  );
};

Button.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  disabled: propTypes.bool,
  action: propTypes.func,
  style: propTypes.object,
  icon: propTypes.string,
  iconSide: propTypes.string,
  isCircle: propTypes.bool,
  additionalClass: propTypes.string,
  type: propTypes.oneOf([
    'type2',
    'type3',
    '',
  ]),
};

Button.defaultProps = {
  disabled: false,
  type: '',
  iconSide: 'left',
  isCircle: false,
  additionalClass: '',
};

export default Button;