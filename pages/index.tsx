import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import {useState} from "react";
import {Button} from "../src/Button/Button";
import React from 'react';

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
        console.log('diff', `${a}`);
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
        }
    }

    const copy = (data: string) => {
        navigator.clipboard.writeText(data);
    };


    return (
        <div>
            <Head>
                <title>JSON Locale Diff</title>
                <meta name="description" content="Show difference between JSON or Javascript Object"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.root}>
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
                        {diffA && <React.Fragment>
                            <textarea
                                value={diffA}
                                disabled
                                rows={16}
                            ></textarea>
                            <Button
                                onClick={() => copy(diffA)}
                                color={'primary'}
                                variant={'contained'}>Copy</Button>
                        </React.Fragment>}
                    </div>
                    <div className={styles.item}>
                        {diffB && <React.Fragment>
                            <textarea
                                value={diffB}
                                disabled
                                rows={16}
                            ></textarea>
                            <Button
                                onClick={() => copy(diffB)}
                                color={'primary'}
                                variant={'contained'}>Copy</Button>
                        </React.Fragment>}
                    </div>
                </section>
            </main>

            <footer>

            </footer>
        </div>
    )
}

export default Home
