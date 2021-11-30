import * as React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { createMuiTheme, ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import '../index.css';
import { StudentProfiles } from './StudentProfiles';

export const App = () => {
    // Change material ui theme to grey
    const theme = createMuiTheme({
        palette: {
          primary: {
            main: grey[700],
          },
        },
    });

    return (
    <>
        <StylesProvider injectFirst> {/* Ensure css takes precedance over mui styling */}
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={StudentProfiles} />
                    <Route render={() => <h1>404</h1>} />
                </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </StylesProvider>
    </>
    );
};