import * as React from 'react'

interface IIntroProps {
    text?: string
}

interface IIntroState {
    text: string
}

export default class Intro extends React.Component<IIntroProps, IIntroState> {
    public render() {
        return (
            <p className="App-intro">
                <span>Llal!</span>
            </p>
        )
    }
}