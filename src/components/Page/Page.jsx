import React, { Fragment } from 'react';
import {BrowserRouter, Switch, Route } from "react-router-dom";

import Header from '../Header';
import SearchBox from '../SearchBox';
import Detail from '../Detail';

const Page = () => {

    return (
        <BrowserRouter>
            <Fragment>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <SearchBox/>
                    </Route>
                    <Route path='/detail'>
                        <Detail/>
                    </Route>
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
};

export default Page;
