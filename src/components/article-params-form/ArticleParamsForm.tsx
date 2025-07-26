import { useClickAway } from '@uidotdev/usehooks';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, MutableRefObject, useState } from 'react';
import clsx from 'clsx';
import React from 'react';

type TAppState = {
	updateAppState: (params: ArticleStateType) => void;
};


export const ArticleParamsForm = ({ updateAppState }: TAppState) => {
  const [isFormVisible, setFormIsOpen] = useState<boolean>(false);
  const [currentFormState, setFormState] = useState<ArticleStateType>(defaultArticleState);

  const ref: MutableRefObject<HTMLElement> | null = useClickAway(() => setFormIsOpen(false));

const updateFormState = (optionName: string, option: OptionType) => {
  setFormState(prevState => ({ ...prevState, [optionName]: option }));
};

const updateParameters = (optionName: string) => (option: OptionType) => {
  updateFormState(optionName, option);
};

  const toggleFormVisibility = () => setFormIsOpen(prev => !prev);

const handleFormSubmission = () => {
  updateAppState(currentFormState);
  setFormIsOpen(false);
};

const onSubmit = (event: FormEvent) => {
  event.preventDefault();
  handleFormSubmission();
};

const resetFormState = () => {
  setFormState(defaultArticleState);
  updateAppState(defaultArticleState);
};

const onReset = (event: FormEvent) => {
  event.preventDefault();
  resetFormState();
};

  const parameterOptions = [
    { title: 'Шрифт', selected: currentFormState.fontFamilyOption, options: fontFamilyOptions, changeParam: 'fontFamilyOption' },
    { title: 'Размер шрифта', selected: currentFormState.fontSizeOption, options: fontSizeOptions, changeParam: 'fontSizeOption', component: RadioGroup },
    { title: 'Цвет шрифта', selected: currentFormState.fontColor, options: fontColors, changeParam: 'fontColor' },
    { title: 'Цвет фона', selected: currentFormState.backgroundColor, options: backgroundColors, changeParam: 'backgroundColor' },
    { title: 'Ширина контента', selected: currentFormState.contentWidth, options: contentWidthArr, changeParam: 'contentWidth' },
  ];

  return (
    <>
      <ArrowButton isOpen={isFormVisible} onClick={toggleFormVisibility} />
      <aside className={clsx(styles.container, isFormVisible && styles.container_open)} ref={ref}>
        <form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
          <Text as='h2' size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          {parameterOptions.map(({ title, selected, options, changeParam, component }) => {
            const Component = component || Select;
            return (
              <Component
                key={title}
                title={title}
                selected={selected}
                options={options}
                onChange={updateParameters(changeParam)}
                name=''
              />
            );
          })}
          <Separator />
          <div className={styles.bottomContainer}>
            <Button title='Сбросить' type='reset' />
            <Button title='Применить' type='submit' />
          </div>
        </form>
      </aside>
    </>
  );
};
