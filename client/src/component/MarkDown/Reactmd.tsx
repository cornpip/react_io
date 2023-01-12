import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

interface ReactMdProps{
    text: string
}

export default function ReactMd(props: ReactMdProps) {
    const {text} = props;
    return (
        <ReactMarkdown children={text}
            remarkPlugins={[rehypeHighlight, remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
                code({ node, inline, className, children, style, ...props }) {
                    console.log("!!!!", node);
                    const match = /language-(\w+)/.exec(className || "")
                    return inline ? (
                        <code
                            style={{
                                //code태그안에서 추가로 태그를 구분할 수 있나? ex) h1, h3
                                //지금 이 문법은 react-markdown
                                padding: "0.2em 0.4em",
                                margin: "0",
                                fontSize: "85%",
                                // fontFamily: "monospace",
                                whiteSpace: "break-spaces",
                                backgroundColor: "var(--highlight-color)",
                                borderRadius: "6px",
                            }}
                            {...props}
                        >
                            {children}
                        </code>
                    ) : match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, "")}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        />
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    )
                },
                blockquote({ node, children, ...props }) {
                    return (
                        <blockquote
                            style={{
                                padding: "0 1em",
                                color: "var(--text-color)",
                                borderLeft: "0.25em solid #dfe2e5",
                                margin: "0",
                                marginTop: "0",
                                marginBottom: "16px",
                            }}
                            {...props}
                        >
                            {children}
                        </blockquote>
                    );
                },
                h1({ node, children, ...props }) {
                    return (
                        <h1
                            style={{
                                paddingBottom: "0.3em",
                                borderBottom: "1px solid #eaecef",
                                // fontSize: "2em",
                            }}
                            {...props}
                        >
                            {children}
                        </h1>
                    )
                },
                h2({ node, children, ...props }) {
                    return (
                        <h2
                            style={{
                                paddingBottom: "0.3em",
                                borderBottom: "1px solid #eaecef",
                            }}
                            {...props}
                        >
                            {children}
                        </h2>
                    )
                },
                a({ node, children, ...props }){
                    return(
                        <a
                            style={{
                                color: "var(--color-accent-fg)",
                                textDecoration: "none",
                                fontWeight: "var(--base-text-weight-semibold, 600)"
                            }}
                            {...props}
                        >
                            {children}
                        </a>
                    )
                }
            }} />
    )
}