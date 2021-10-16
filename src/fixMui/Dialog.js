// import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
// import _extends from '@babel/runtime/helpers/esm/extends';
import * as React from 'preact/compat';
// import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/core';
import { unstable_useId as useId } from '@mui/utils';
import capitalize from '@mui/material/utils/capitalize';
import Modal from './Modal';
import Fade from '@mui/material/Fade';
import { duration } from '@mui/material/styles/createTransitions';
import Paper from '@mui/material/Paper';
import useThemeProps from '@mui/material/styles/useThemeProps';
import styled from '@mui/material/styles/styled';
import dialogClasses, {
  getDialogUtilityClass,
} from '@mui/material/Dialog/dialogClasses';
import DialogContext from '@mui/material/Dialog/DialogContext';
import Backdrop from './Backdrop';
import { jsx as _jsx } from 'preact/jsx-runtime';
const DialogBackdrop = styled(Backdrop, {
  name: 'MuiDialog',
  slot: 'Backdrop',
  overrides: (props, styles) => styles.backdrop,
})({
  // Improve scrollable dialog support.
  zIndex: -1,
});

const useUtilityClasses = (ownerState) => {
  const { classes, scroll, maxWidth, fullWidth, fullScreen } = ownerState;
  const slots = {
    root: ['root'],
    container: ['container', `scroll${capitalize(scroll)}`],
    paper: [
      'paper',
      `paperScroll${capitalize(scroll)}`,
      `paperWidth${capitalize(String(maxWidth))}`,
      fullWidth && 'paperFullWidth',
      fullScreen && 'paperFullScreen',
    ],
  };
  return composeClasses(slots, getDialogUtilityClass, classes);
};

const DialogRoot = styled(Modal, {
  name: 'MuiDialog',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({
  '@media print': {
    // Use !important to override the Modal inline-style.
    position: 'absolute !important',
  },
});
const DialogContainer = styled('div', {
  name: 'MuiDialog',
  slot: 'Container',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [styles.container, styles[`scroll${capitalize(ownerState.scroll)}`]];
  },
})(({ ownerState }) =>
  Object.assign(
    {
      height: '100%',
      '@media print': {
        height: 'auto',
      },
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 0,
    },
    ownerState.scroll === 'paper' && {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ownerState.scroll === 'body' && {
      overflowY: 'auto',
      overflowX: 'hidden',
      textAlign: 'center',
      '&:after': {
        content: '""',
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '100%',
        width: '0',
      },
    },
  ),
);
const DialogPaper = styled(Paper, {
  name: 'MuiDialog',
  slot: 'Paper',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.paper,
      styles[`scrollPaper${capitalize(ownerState.scroll)}`],
      styles[`paperWidth${capitalize(String(ownerState.maxWidth))}`],
      ownerState.fullWidth && styles.paperFullWidth,
      ownerState.fullScreen && styles.paperFullScreen,
    ];
  },
})(({ theme, ownerState }) =>
  Object.assign(
    {
      margin: 32,
      position: 'relative',
      overflowY: 'auto',
      // Fix IE11 issue, to remove at some point.
      '@media print': {
        overflowY: 'visible',
        boxShadow: 'none',
      },
    },
    ownerState.scroll === 'paper' && {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 'calc(100% - 64px)',
    },
    ownerState.scroll === 'body' && {
      display: 'inline-block',
      verticalAlign: 'middle',
      textAlign: 'left', // 'initial' doesn't work on IE11
    },
    !ownerState.maxWidth && {
      maxWidth: 'calc(100% - 64px)',
    },
    ownerState.maxWidth === 'xs' && {
      maxWidth:
        theme.breakpoints.unit === 'px'
          ? Math.max(theme.breakpoints.values.xs, 444)
          : `${theme.breakpoints.values.xs}${theme.breakpoints.unit}`,
      [`&.${dialogClasses.paperScrollBody}`]: {
        [theme.breakpoints.down(
          Math.max(theme.breakpoints.values.xs, 444) + 32 * 2,
        )]: {
          maxWidth: 'calc(100% - 64px)',
        },
      },
    },
    ownerState.maxWidth !== 'xs' && {
      maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${
        theme.breakpoints.unit
      }`,
      [`&.${dialogClasses.paperScrollBody}`]: {
        [theme.breakpoints.down(
          theme.breakpoints.values[ownerState.maxWidth] + 32 * 2,
        )]: {
          maxWidth: 'calc(100% - 64px)',
        },
      },
    },
    ownerState.fullWidth && {
      width: 'calc(100% - 64px)',
    },
    ownerState.fullScreen && {
      margin: 0,
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: 'none',
      borderRadius: 0,
      [`&.${dialogClasses.paperScrollBody}`]: {
        margin: 0,
        maxWidth: '100%',
      },
    },
  ),
);
const defaultTransitionDuration = {
  enter: duration.enteringScreen,
  exit: duration.leavingScreen,
};
/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */

const Dialog = /*#__PURE__*/ React.forwardRef(function Dialog(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiDialog',
  });

  const {
    'aria-describedby': ariaDescribedby,
    'aria-labelledby': ariaLabelledbyProp,
    BackdropComponent,
    BackdropProps,
    children,
    className,
    disableEscapeKeyDown = false,
    fullScreen = false,
    fullWidth = false,
    maxWidth = 'sm',
    onBackdropClick,
    onClose,
    open,
    PaperComponent = Paper,
    PaperProps = {},
    scroll = 'paper',
    TransitionComponent = Fade,
    transitionDuration = defaultTransitionDuration,
    TransitionProps,
    ...other
  } = props;

  const ownerState = Object.assign({}, props, {
    disableEscapeKeyDown,
    fullScreen,
    fullWidth,
    maxWidth,
    scroll,
  });

  const classes = useUtilityClasses(ownerState);
  const backdropClick = React.useRef();

  const handleMouseDown = (event) => {
    // We don't want to close the dialog when clicking the dialog content.
    // Make sure the event starts and ends on the same DOM element.
    backdropClick.current = event.target === event.currentTarget;
  };

  const handleBackdropClick = (event) => {
    // Ignore the events not coming from the "backdrop".
    if (!backdropClick.current) {
      return;
    }

    backdropClick.current = null;

    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (onClose) {
      onClose(event, 'backdropClick');
    }
  };

  const ariaLabelledby = useId(ariaLabelledbyProp);
  const dialogContextValue = React.useMemo(() => {
    return {
      titleId: ariaLabelledby,
    };
  }, [ariaLabelledby]);
  return /*#__PURE__*/ _jsx(
    DialogRoot,
    Object.assign(
      {
        className: clsx(classes.root, className),
        BackdropProps: Object.assign(
          {
            transitionDuration,
            as: BackdropComponent,
          },
          BackdropProps,
        ),
        closeAfterTransition: true,
        BackdropComponent: DialogBackdrop,
        disableEscapeKeyDown: disableEscapeKeyDown,
        onClose: onClose,
        open: open,
        ref: ref,
        onClick: handleBackdropClick,
        ownerState: ownerState,
      },
      other,
      {
        children: /*#__PURE__*/ _jsx(
          TransitionComponent,
          Object.assign(
            {
              appear: true,
              in: open,
              timeout: transitionDuration,
              role: 'presentation',
            },
            TransitionProps,
            {
              children: /*#__PURE__*/ _jsx(DialogContainer, {
                className: clsx(classes.container),
                onMouseDown: handleMouseDown,
                ownerState: ownerState,
                children: /*#__PURE__*/ _jsx(
                  DialogPaper,
                  Object.assign(
                    {
                      as: PaperComponent,
                      elevation: 24,
                      role: 'dialog',
                      'aria-describedby': ariaDescribedby,
                      'aria-labelledby': ariaLabelledby,
                    },
                    PaperProps,
                    {
                      className: clsx(classes.paper, PaperProps.className),
                      ownerState: ownerState,
                      children: /*#__PURE__*/ _jsx(DialogContext.Provider, {
                        value: dialogContextValue,
                        children: children,
                      }),
                    },
                  ),
                ),
              }),
            },
          ),
        ),
      },
    ),
  );
});

export default Dialog;
