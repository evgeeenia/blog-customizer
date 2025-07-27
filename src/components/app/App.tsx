import { CSSProperties, useState } from 'react';
import {ArticleStateType, defaultArticleState,} from 'src/constants/articleProps';
import styles from './App.module.scss';
import { ArticleParamsForm } from 'components/article-params-form';
import { Article } from 'components/article';


export const App = () => {
  const [appState, updateAppState] = useState<ArticleStateType>(defaultArticleState);

  const generateStyles = (): CSSProperties => ({
    '--font-family': appState.fontFamilyOption.value,
    '--font-size': appState.fontSizeOption.value,
    '--font-color': appState.fontColor.value,
    '--container-width': appState.contentWidth.value,
    '--bg-color': appState.backgroundColor.value,
  } as CSSProperties);

  return (
    <div className={styles.main} style={generateStyles()}>
      <ArticleParamsForm updateAppState={updateAppState} />
      <Article />
    </div>
  );
};




