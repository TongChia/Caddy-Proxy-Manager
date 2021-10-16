// import _extends from "@babel/runtime/helpers/esm/extends";
// import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";

var _Input, _FilledInput;

// const _excluded = ["autoWidth", "children", "classes", "className", "displayEmpty", "IconComponent", "id", "input", "inputProps", "label", "labelId", "MenuProps", "multiple", "native", "onClose", "onOpen", "open", "renderValue", "SelectDisplayProps", "variant"],
//       _excluded2 = ["root"];
import * as React from 'preact/compat';
// import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/core';
import SelectInput from '@mui/material/Select/SelectInput';
import formControlState from '@mui/material/FormControl/formControlState';
import useFormControl from '@mui/material/FormControl/useFormControl';
import ArrowDropDownIcon from '@mui/material/internal/svg-icons/ArrowDropDown';
import Input from '@mui/material/Input';
import NativeSelectInput from '@mui/material/NativeSelect/NativeSelectInput';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import useThemeProps from '@mui/material/styles/useThemeProps';
import useForkRef from '@mui/material/utils/useForkRef';
import { getSelectUtilityClasses } from '@mui/material/Select/selectClasses';
import { jsx as _jsx } from 'preact/jsx-runtime';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;
  const slots = {
    root: ['root'],
  };
  return composeClasses(slots, getSelectUtilityClasses, classes);
};

const Select = /*#__PURE__*/ React.forwardRef(function Select(inProps, ref) {
  const props = useThemeProps({
    name: 'MuiSelect',
    props: inProps,
  });

  const {
    autoWidth = false,
    children,
    classes: classesProp = {},
    className,
    displayEmpty = false,
    IconComponent = ArrowDropDownIcon,
    id,
    input,
    inputProps,
    label,
    labelId,
    MenuProps,
    multiple = false,
    native = false,
    onClose,
    onOpen,
    open,
    renderValue,
    SelectDisplayProps,
    variant: variantProps = 'outlined',
    ...other
  } = props;
  // other = _objectWithoutPropertiesLoose(props, _excluded);

  const inputComponent = native ? NativeSelectInput : SelectInput;
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['variant'],
  });
  const variant = fcs.variant || variantProps;
  const InputComponent =
    input ||
    {
      standard: _Input || (_Input = /*#__PURE__*/ _jsx(Input, {})),
      outlined: /*#__PURE__*/ _jsx(OutlinedInput, {
        label: label,
      }),
      filled:
        _FilledInput || (_FilledInput = /*#__PURE__*/ _jsx(FilledInput, {})),
    }[variant];

  const ownerState = Object.assign({}, props, {
    classes: classesProp,
  });

  const classes = useUtilityClasses(ownerState);

  // const otherClasses = _objectWithoutPropertiesLoose(classesProp, _excluded2);
  const { root, ...otherClasses } = classesProp;

  const inputComponentRef = useForkRef(ref, InputComponent.ref);
  return /*#__PURE__*/ React.cloneElement(
    InputComponent,
    Object.assign(
      {
        // Most of the logic is implemented in `SelectInput`.
        // The `Select` component is a simple API wrapper to expose something better to play with.
        inputComponent,
        inputProps: Object.assign(
          {
            children,
            IconComponent,
            variant,
            type: undefined,
            // We render a select. We can ignore the type provided by the `Input`.
            multiple,
          },
          native
            ? {
                id,
              }
            : {
                autoWidth,
                displayEmpty,
                labelId,
                MenuProps,
                onClose,
                onOpen,
                open,
                renderValue,
                SelectDisplayProps: Object.assign(
                  {
                    id,
                  },
                  SelectDisplayProps,
                ),
              },
          inputProps,
          {
            classes: inputProps
              ? deepmerge(otherClasses, inputProps.classes)
              : otherClasses,
          },
          input ? input.props.inputProps : {},
        ),
      },
      multiple && native && variant === 'outlined'
        ? {
            notched: true,
          }
        : {},
      {
        ref: inputComponentRef,
        className: clsx(
          classes.root,
          InputComponent.props.className,
          className,
        ),
      },
      other,
    ),
  );
});
// process.env.NODE_ENV !== "production" ? Select.propTypes
// /* remove-proptypes */
// = {
//   // ----------------------------- Warning --------------------------------
//   // | These PropTypes are generated from the TypeScript type definitions |
//   // |     To update them edit the d.ts file and run "yarn proptypes"     |
//   // ----------------------------------------------------------------------
//
//   /**
//    * If `true`, the width of the popover will automatically be set according to the items inside the
//    * menu, otherwise it will be at least the width of the select input.
//    * @default false
//    */
//   autoWidth: PropTypes.bool,
//
//   /**
//    * The option elements to populate the select with.
//    * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
//    *
//    * ⚠️The `MenuItem` elements **must** be direct descendants when `native` is false.
//    */
//   children: PropTypes.node,
//
//   /**
//    * Override or extend the styles applied to the component.
//    * @default {}
//    */
//   classes: PropTypes.object,
//
//   /**
//    * @ignore
//    */
//   className: PropTypes.string,
//
//   /**
//    * The default value. Use when the component is not controlled.
//    */
//   defaultValue: PropTypes.any,
//
//   /**
//    * If `true`, a value is displayed even if no items are selected.
//    *
//    * In order to display a meaningful value, a function can be passed to the `renderValue` prop which
//    * returns the value to be displayed when no items are selected.
//    *
//    * ⚠️ When using this prop, make sure the label doesn't overlap with the empty displayed value.
//    * The label should either be hidden or forced to a shrunk state.
//    * @default false
//    */
//   displayEmpty: PropTypes.bool,
//
//   /**
//    * The icon that displays the arrow.
//    * @default ArrowDropDownIcon
//    */
//   IconComponent: PropTypes.elementType,
//
//   /**
//    * The `id` of the wrapper element or the `select` element when `native`.
//    */
//   id: PropTypes.string,
//
//   /**
//    * An `Input` element; does not have to be a material-ui specific `Input`.
//    */
//   input: PropTypes.element,
//
//   /**
//    * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
//    * When `native` is `true`, the attributes are applied on the `select` element.
//    */
//   inputProps: PropTypes.object,
//
//   /**
//    * See [OutlinedInput#label](/api/outlined-input/#props)
//    */
//   label: PropTypes.node,
//
//   /**
//    * The ID of an element that acts as an additional label. The Select will
//    * be labelled by the additional label and the selected value.
//    */
//   labelId: PropTypes.string,
//
//   /**
//    * Props applied to the [`Menu`](/api/menu/) element.
//    */
//   MenuProps: PropTypes.object,
//
//   /**
//    * If `true`, `value` must be an array and the menu will support multiple selections.
//    * @default false
//    */
//   multiple: PropTypes.bool,
//
//   /**
//    * If `true`, the component uses a native `select` element.
//    * @default false
//    */
//   native: PropTypes.bool,
//
//   /**
//    * Callback fired when a menu item is selected.
//    *
//    * @param {SelectChangeEvent<T>} event The event source of the callback.
//    * You can pull out the new value by accessing `event.target.value` (any).
//    * **Warning**: This is a generic event not a change event unless the change event is caused by browser autofill.
//    * @param {object} [child] The react element that was selected when `native` is `false` (default).
//    */
//   onChange: PropTypes.func,
//
//   /**
//    * Callback fired when the component requests to be closed.
//    * Use in controlled mode (see open).
//    *
//    * @param {object} event The event source of the callback.
//    */
//   onClose: PropTypes.func,
//
//   /**
//    * Callback fired when the component requests to be opened.
//    * Use in controlled mode (see open).
//    *
//    * @param {object} event The event source of the callback.
//    */
//   onOpen: PropTypes.func,
//
//   /**
//    * If `true`, the component is shown.
//    * You can only use it when the `native` prop is `false` (default).
//    */
//   open: PropTypes.bool,
//
//   /**
//    * Render the selected value.
//    * You can only use it when the `native` prop is `false` (default).
//    *
//    * @param {any} value The `value` provided to the component.
//    * @returns {ReactNode}
//    */
//   renderValue: PropTypes.func,
//
//   /**
//    * Props applied to the clickable div element.
//    */
//   SelectDisplayProps: PropTypes.object,
//
//   /**
//    * The system prop that allows defining system overrides as well as additional CSS styles.
//    */
//   sx: PropTypes.object,
//
//   /**
//    * The `input` value. Providing an empty string will select no options.
//    * Set to an empty string `''` if you don't want any of the available options to be selected.
//    *
//    * If the value is an object it must have reference equality with the option in order to be selected.
//    * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
//    */
//   value: PropTypes.any,
//
//   /**
//    * The variant to use.
//    * @default 'outlined'
//    */
//   variant: PropTypes.oneOf(['filled', 'outlined', 'standard'])
// } : void 0;
Select.muiName = 'Select';
export default Select;