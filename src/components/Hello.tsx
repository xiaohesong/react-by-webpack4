import * as React from "react";

export type HelloProps = { compiler: string, framework: string }

export default (props: HelloProps) => (
    <h1>Hello from { props.compiler } and { props.framework }, I'm show by TypeScript !</h1>
)