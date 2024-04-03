import * as React from "react";

interface MailTemplateProps {
    fontSize: number;
    textColor: string;
}

export default function MailTemplate(props: MailTemplateProps) {
    const { fontSize, textColor } = props;

    return (
        <div className="text-black" style={{ fontSize: `${fontSize}px`, color: textColor }}>
            <h1>Mail Template</h1>
            <p>This is a mail template.</p>
        </div>
    );
}