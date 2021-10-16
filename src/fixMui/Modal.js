// import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
// import _extends from "@babel/runtime/helpers/esm/extends";
// const _excluded = ["BackdropComponent", "closeAfterTransition", "children", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted"];
// import * as React from 'react';
import { forwardRef } from 'preact/compat';
import { useState } from 'preact/hooks';
// import PropTypes from 'prop-types';
import { isHostComponent } from '@mui/core';
// import { elementAcceptingRef, HTMLElementType } from '@mui/utils';
import ModalUnstyled, { modalUnstyledClasses } from '@mui/core/ModalUnstyled';
import styled from '@mui/material/styles/styled';
import useThemeProps from '@mui/material/styles/useThemeProps';
import Backdrop from './Backdrop';
import { jsx as _jsx } from 'preact/jsx-runtime';
export const modalClasses = modalUnstyledClasses;

const extendUtilityClasses = (ownerState) => {
  return ownerState.classes;
};

const ModalRoot = styled('div', {
  name: 'MuiModal',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.root,
      !ownerState.open && ownerState.exited && styles.hidden,
    ];
  },
})(({ theme, ownerState }) =>
  Object.assign(
    {
      position: 'fixed',
      zIndex: theme.zIndex.modal,
      right: 0,
      bottom: 0,
      top: 0,
      left: 0,
    },
    !ownerState.open &&
      ownerState.exited && {
        visibility: 'hidden',
      },
  ),
);
const ModalBackdrop = styled(Backdrop, {
  name: 'MuiModal',
  slot: 'Backdrop',
  overridesResolver: (props, styles) => {
    return styles.backdrop;
  },
})({
  zIndex: -1,
});
/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * - [Dialog](/api/dialog/)
 * - [Drawer](/api/drawer/)
 * - [Menu](/api/menu/)
 * - [Popover](/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 */

const Modal = /*#__PURE__*/ forwardRef(function Modal(inProps, ref) {
  var _componentsProps$root;

  const props = useThemeProps({
    name: 'MuiModal',
    props: inProps,
  });

  const {
    BackdropComponent = ModalBackdrop,
    closeAfterTransition = false,
    children,
    components = {},
    componentsProps = {},
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    ...other
  } = props;

  const [exited, setExited] = useState(true);
  const commonProps = {
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted,
  };

  const ownerState = Object.assign({}, props, commonProps, {
    exited,
  });

  const classes = extendUtilityClasses(ownerState);
  return /*#__PURE__*/ _jsx(
    ModalUnstyled,
    Object.assign(
      {
        components: Object.assign(
          {
            Root: ModalRoot,
          },
          components,
        ),
        componentsProps: {
          root: Object.assign(
            {},
            componentsProps.root,
            (!components.Root || !isHostComponent(components.Root)) && {
              ownerState: Object.assign(
                {},
                (_componentsProps$root = componentsProps.root) == null
                  ? void 0
                  : _componentsProps$root.ownerState,
              ),
            },
          ),
        },
        BackdropComponent: BackdropComponent,
        onTransitionEnter: () => setExited(false),
        onTransitionExited: () => setExited(true),
        ref: ref,
      },
      other,
      {
        classes: classes,
      },
      commonProps,
      {
        children: children,
      },
    ),
  );
});
export default Modal;
