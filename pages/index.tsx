import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import {useState} from "react";
import {Button} from "../src/Button/Button";
import React from 'react';
import {event} from "./_app";

const Home: NextPage = () => {

    const [contentOne, setContentOne] = useState<string>('');
    const [contentTwo, setContentTwo] = useState<string>('');

    const [diffA, setDiffA] = useState('');
    const [diffB, setDiffB] = useState('');

    const stringObject = (x: Object) => (Object.keys(x).length > 0 ?
        `${JSON.stringify(x)}` : '')
        .replaceAll('{', '')
        .replaceAll('}', '')
        .replaceAll(',', ',\n');


    const getDifference = (x: Object, y: Object) => {
        const a = JSON.parse(JSON.stringify(x));
        const b = JSON.parse(JSON.stringify(y));
        for (const key of Object.keys(a)) {
            if (b[key]) {
                delete a[key]
            }
        }
        return stringObject(a);
    }


    const compareTwo = () => {
        let a: Object = {}, b: Object = {}

        try {
            eval(("a = " + contentOne));
        } catch (e) {
        }

        try {
            eval(("b = " + contentTwo));
        } catch (e) {
        }

        if (typeof a === 'object' && typeof b === 'object') {
            setDiffA(getDifference(a, b));
            setDiffB(getDifference(b, a));
            try {
                event('Compare Event', {
                    length_a: Object.keys(a).length,
                    length_b: Object.keys(b).length,
                });
            } catch (e) {
            }
        }
    }

    const copy = (data: string, side: string) => {
        navigator.clipboard.writeText(data);
        try {
            event('Copy Content', {
                side
            });
        } catch (e) {
        }
    };


    return (
        <div>
            <Head>
                <title>JSON Locale Diff</title>
                <meta name="description" content="Show difference between JSON or Javascript Object"/>
                <link rel="icon" href="/favicon.ico"/>

                <meta property="og:image" content="https://json-locale-diff.netlify.app/cover.jpeg"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>

                <meta property="og:title" content='JSON Locale Diff'/>
                <meta name="twitter:card" content="summary_large_image"/>
                <meta property="og:description" content="Show difference between JSON or Javascript Object"/>
            </Head>

            <main className={styles.root}>
                <div className={styles.cover}/>
                <section className={styles.container}>
                    <div className={styles.item}>
                        <textarea
                            value={contentOne}
                            onChange={(e) => setContentOne(e.target.value)}
                            rows={16}
                            placeholder={'First JSON or javascript object'}></textarea>
                        <Button
                            onClick={compareTwo}
                            color={'primary'}
                            variant={'contained'}>Compare</Button>
                    </div>
                    <div className={styles.item}>
                        <textarea
                            value={contentTwo}
                            onChange={(e) => setContentTwo(e.target.value)}
                            rows={16}
                            placeholder={'Second JSON or javascript object'}></textarea>
                    </div>
                </section>
                <section className={styles.container}>
                    <div className={styles.item}>
                        {diffB && <React.Fragment>
                            <textarea
                                value={diffB}
                                disabled
                                rows={16}
                            ></textarea>
                            <Button
                                onClick={() => copy(diffB, 'left')}
                                color={'primary'}
                                variant={'contained'}>Copy</Button>
                        </React.Fragment>}
                    </div>
                    <div className={styles.item}>
                        {diffA && <React.Fragment>
                            <textarea
                                value={diffA}
                                disabled
                                rows={16}
                            ></textarea>
                            <Button
                                onClick={() => copy(diffA, 'right')}
                                color={'primary'}
                                variant={'contained'}>Copy</Button>
                        </React.Fragment>}
                    </div>
                </section>
            </main>

            <footer className={styles.footer}>
                <section className={styles.container}>
                    <p> Code with ❤️ by <a target={'_blank'} href="https://www.linkedin.com/in/bruce-guenkam"
                                           rel="noreferrer">Bruce Guenkam</a>.</p>
                    <div style={{flexGrow: 1}}/>
                    <a href="https://www.buymeacoffee.com/bruceguenkam" target={'_blank'} rel="noreferrer">
                        <img src="/yellow-button.png" alt=""/>
                    </a>
                    <div style={{flexGrow: 1}}/>
                    <a href="https://github.com/sand97/json-locale-diff" target={'_blank'} rel="noreferrer">Source</a>
                </section>
            </footer>
        </div>
    )
}

export default Home
