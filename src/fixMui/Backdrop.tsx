// import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
// import _extends from "@babel/runtime/helpers/esm/extends";
// const _excluded = ["children", "components", "componentsProps", "className", "invisible", "open", "transitionDuration", "TransitionComponent"];
// import * as React from 'react';
import { forwardRef } from 'preact/compat';
// import PropTypes from 'prop-types';
import { isHostComponent } from '@mui/core';
import BackdropUnstyled, {
  backdropUnstyledClasses,
} from '@mui/core/BackdropUnstyled';
import styled from '@mui/material/styles/styled';
import useThemeProps from '@mui/material/styles/useThemeProps';
import Fade from '@mui/material/Fade';
import { jsx as _jsx } from 'preact/jsx-runtime';
import type { BackdropProps } from '@mui/material/Backdrop';
export const backdropClasses = backdropUnstyledClasses;

const extendUtilityClasses = (ownerState: { classes: string }) => {
  const { classes } = ownerState;
  return classes;
};

const BackdropRoot = styled('div', {
  name: 'MuiBackdrop',
  slot: 'Root',
  overridesResolver: (
    { ownerState }: { ownerState: { invisible: boolean } },
    styles,
  ) => [styles.root, ownerState.invisible && styles.invisible],
})(({ ownerState }: { ownerState: { invisible: boolean } }) => ({
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  WebkitTapHighlightColor: 'transparent',
  ...(ownerState.invisible && {
    backgroundColor: 'transparent',
  }),
}));
const Backdrop = forwardRef(function Backdrop(inProps: BackdropProps, ref) {
  var _componentsProps$root;

  const props = useThemeProps({
    props: inProps,
    name: 'MuiBackdrop',
  });

  const {
    children,
    components = {},
    componentsProps = {},
    className,
    invisible = false,
    open,
    transitionDuration,
    // eslint-disable-next-line react/prop-types
    // @ts-ignore
    TransitionComponent = Fade,
    ...other
  } = props;

  const ownerState = Object.assign({}, props, {
    invisible,
  });

  // @ts-ignore
  const classes = extendUtilityClasses(ownerState);
  return /*#__PURE__*/ _jsx(TransitionComponent, {
    in: open,
    timeout: transitionDuration,
    ...other,
    // @ts-ignore
    children: /*#__PURE__*/ _jsx(BackdropUnstyled, {
      className: className,
      invisible: invisible,
      components: {
        Root: BackdropRoot,
        ...components,
      },
      componentsProps: {
        root: Object.assign(
          {},
          componentsProps.root,
          (!components.Root || !isHostComponent(components.Root)) && {
            ownerState: Object.assign(
              {},
              (_componentsProps$root = componentsProps.root) == null
                ? void 0 // @ts-ignore
                : _componentsProps$root.ownerState,
            ),
          },
        ),
      },
      classes: classes,
      ref: ref,
      children: children,
    }),
  });
});
export default Backdrop;
