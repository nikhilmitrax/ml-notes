import React from 'react';
import { MousePointer2 } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';
import Callout from '../../../components/Callout';
import CodeBlock from '../../../components/CodeBlock';
import EquationBlock from '../../../components/EquationBlock';
import Equation from '../../../components/Equation';
import InteractiveCard from '../../../components/InteractiveCard';

const InteractiveDemo = () => {
    return (
        <Section title="Interactive & Rich Content" icon={MousePointer2}>
            <Header3>Callouts</Header3>
            <Paragraph>Callouts are used to highlight specific types of information.</Paragraph>

            <Callout type="info" title="Information">
                This is an info callout. Use it for general notes or additional context.
            </Callout>

            <Callout type="tip" title="Pro Tip">
                This is a tip callout. Use it for best practices or helpful shortcuts.
            </Callout>

            <Callout type="warning" title="Warning">
                This is a warning callout. Use it for potential pitfalls or things to watch out for.
            </Callout>

            <Callout type="caution" title="Caution">
                This is a caution callout. Use it for critical warnings or errors.
            </Callout>

            <Header3>Code Blocks</Header3>
            <Paragraph>Code blocks support syntax highlighting. Default is Python.</Paragraph>
            <CodeBlock
                language="python"
                code={`def hello_world():
    print("Hello, World!")
    return True`}
            />
            <Paragraph>You can also specify other languages like JavaScript.</Paragraph>
            <CodeBlock
                language="javascript"
                code={`function helloWorld() {
    console.log("Hello, World!");
}`}
            />

            <Header3>Equations</Header3>
            <Paragraph>
                We use KaTeX for rendering math. You can use inline equations like <Equation>E = mc^2</Equation> within text.
            </Paragraph>
            <Paragraph>
                For larger derivations, use the EquationBlock. It supports expanding steps.
            </Paragraph>

            <EquationBlock>
                <Equation>{'f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi)\\,e^{2\\pi i \\xi x} \\,d\\xi'}</Equation>
                <Equation hidden>
                    {'= \\text{This step is initially hidden}'}
                </Equation>
                <Equation hidden>
                    {'= \\text{Click the arrow to reveal derivation steps}'}
                </Equation>
            </EquationBlock>

            <Header3>Interactive Cards</Header3>
            <Paragraph>
                Interactive cards are containers for custom interactive visualizations.
            </Paragraph>
            <InteractiveCard title="Interactive Demo">
                <div className="p-4 bg-slate-50 rounded text-center">
                    <p className="text-slate-600">
                        Place your custom interactive components (charts, sliders, diagrams) here.
                    </p>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                        Click Me
                    </button>
                </div>
            </InteractiveCard>
        </Section>
    );
};

export default InteractiveDemo;
