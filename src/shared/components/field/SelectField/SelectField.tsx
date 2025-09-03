// import styles from './select-field.module.css';
import { Combobox, Input, InputBase, Loader, ScrollArea, useCombobox, type ComboboxOptionProps, type ComboboxProps, type InputBaseProps, type ScrollAreaAutosizeProps } from '@mantine/core';
import { useField } from '@tanstack/react-form';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

export interface SelectFieldProps<T> {
  fixeValue?: T;
  render: (value: T) => { label: string | number; value: string | number, data: T };
  optionRender?: (value: T) => React.ReactNode
  form: any;
  name: string;
  isError?: boolean;
  validators?: {
    onChange?: (state: any) => { message: string | number | boolean } | undefined;
    onBlur?: (state: any) => { message: string | number | boolean } | undefined;
    onChangeAsync?: (state: any) => Promise<{ message: string | number | boolean } | undefined>;
    onBlurAsync?: (state: any) => Promise<{ message: string | number | boolean } | undefined>;
  };
  query?: {
    infiniteScroll?: boolean
    queryFn: () => any
    isLoading: boolean
  };
  placeholder?: string
  data: T[] | undefined
  inputProps?: InputBaseProps
  comboboxProps?: ComboboxProps
  disabledOption?: (value: T) => boolean | undefined
  comboboxOptionProps?: ComboboxOptionProps
  scrollAreaAutoSizeProps?: ScrollAreaAutosizeProps
}

export const SelectField = <T,>({
  fixeValue = undefined,
  render,
  optionRender,
  form,
  name,
  isError = false,
  validators,
  placeholder = "Selectionnez une valeur",
  query,
  data,
  inputProps,
  comboboxProps,
  disabledOption,
  comboboxOptionProps,
  scrollAreaAutoSizeProps
}: SelectFieldProps<T>) => {

  const selectRef = useRef<HTMLDivElement>(null);
  const field = useField({
    form,
    name,
    validators: validators,
  });

  // Récupération de la première erreur si elle existe
  const errorMessage = useMemo(() =>
    isError && field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? (field.state.meta.errors[0] as unknown as { message: string }).message
      : undefined
    , [field])


  const selectCustomer = useCombobox(
  )

  const dataTraited = useMemo(() => {
    return data?.map(item => {
      const rendered = render(item);
      return {
        ...rendered,
        value: String(rendered.value), // forcer toujours en string
      };
    });
  }, [data, render]);

  const handleOptionRender = useCallback((data: T) => {
    return optionRender ? optionRender(data) : render(data).label
  }, [optionRender])


  const optionSelectCustomer = useMemo(() =>
    dataTraited?.map(({ value, data }) => (
      <Combobox.Option
        disabled={disabledOption && disabledOption(data)}
        {...comboboxOptionProps}
        key={value} value={String(value)}>
        {handleOptionRender(data)}
      </Combobox.Option>
    ))
    , [dataTraited, handleOptionRender, disabledOption])

  const traitedValueSelected = useMemo(() => {
    const _value1 = field.state.value ? dataTraited?.filter(item => String(item.value) === String(field.state.value))[0] : undefined;
    const _value2 = fixeValue ? dataTraited?.filter(item => String(item.value) === String(render(fixeValue).value))[0] : undefined;
    return _value2 ?? _value1
  }, [data, render, field.state.value, fixeValue, dataTraited])



  useEffect(() => {
    const _value2 = fixeValue ? dataTraited?.filter(item => String(item.value) === String(render(fixeValue).value))[0] : undefined;
    _value2 && field.handleChange(_value2.value)
  }, [fixeValue, dataTraited])

  return (
    <Combobox
      {...comboboxProps}
      store={selectCustomer}
      withinPortal={false}
      onOptionSubmit={(val) => {
        field.handleChange(val);
        selectCustomer.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          {...inputProps}

          disabled={!!fixeValue || query?.isLoading}
          name={name}
          onChange={(e) => field.handleChange(e.currentTarget.value)}
          onBlur={field.handleBlur}
          component="button"
          type="button"
          pointer
          rightSection={query?.isLoading ? <Loader size='sm' /> : <Combobox.Chevron />}
          onClick={() => selectCustomer.toggleDropdown()}
          rightSectionPointerEvents="none"
          withAsterisk
          radius="md"
          size="md"
          error={errorMessage}
          errorProps={{ ms: "lg", me: "lg" }}
          value={traitedValueSelected?.value}
        >
          {traitedValueSelected ? handleOptionRender(traitedValueSelected.data) : <Input.Placeholder>{placeholder}</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      {!fixeValue && (
        <Combobox.Dropdown>
          <Combobox.Options>
            {!dataTraited ?
              <Combobox.Empty>Chargement...</Combobox.Empty> :
              <ScrollArea.Autosize
                {...scrollAreaAutoSizeProps}
                viewportRef={selectRef}
                mah={200}
                onScrollPositionChange={() => {
                  const el = selectRef.current;
                  if (!el) return;
                  const scrollTop = el.scrollTop;
                  const clientHeight = el.clientHeight;
                  const scrollHeight = el.scrollHeight;
                  const isBottom = scrollTop + clientHeight >= scrollHeight - 60;
                  if (isBottom) {
                    query?.infiniteScroll && !query.isLoading && query.queryFn();
                  }
                }}
              >
                {optionSelectCustomer}
              </ScrollArea.Autosize>
            }
          </Combobox.Options>
        </Combobox.Dropdown>
      )}
    </Combobox>
  );
};
