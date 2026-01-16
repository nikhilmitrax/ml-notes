import React from 'react';
import { Network } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Equation from '../../../components/Equation';
import Callout from '../../../components/Callout';

const ResidualStreamScaling = () => {
    return (
        <Section title="Residual Stream Scaling" icon={Network}>
            <Paragraph>
                All methods discussed so far operate on a <strong>single residual stream</strong>—one vector flowing through all layers. <strong>Residual stream scaling</strong> methods take a more radical approach: they widen the residual stream itself, creating multiple parallel information pathways that can mix and interact.
            </Paragraph>

            <Header3>Hyper-Connections (HC)</Header3>
            <Paragraph>
                <strong>Hyper-Connections</strong> transform the single-lane residual highway into a multi-lane expressway. Instead of one residual stream, HC maintains <Equation>{`n`}</Equation> parallel streams that can exchange information.
            </Paragraph>

            <Header4>The HC Formulation</Header4>
            <Paragraph>
                Let <Equation>{`\\mathbf{h}_l = [h_l^1, h_l^2, \\ldots, h_l^n]`}</Equation> be the expanded residual state at layer <Equation>{`l`}</Equation>, where each <Equation>{`h_l^i \\in \\mathbb{R}^d`}</Equation>. HC updates this via:
            </Paragraph>
            <Equation block>
                {`\\mathbf{h}_{l+1} = M_l \\mathbf{h}_l + [F(\\bar{h}_l), 0, \\ldots, 0]`}
            </Equation>
            <Paragraph>
                where:
            </Paragraph>
            <List>
                <ListItem>
                    <Equation>{`M_l \\in \\mathbb{R}^{n \\times n}`}</Equation> is a learnable mixing matrix that combines streams.
                </ListItem>
                <ListItem>
                    <Equation>{`\\bar{h}_l`}</Equation> is the aggregated input to the residual function (e.g., weighted sum of streams).
                </ListItem>
                <ListItem>
                    Only the first stream receives the residual output; others flow forward with mixing only.
                </ListItem>
            </List>

            <Header4>Benefits of Multi-Stream Design</Header4>
            <List>
                <ListItem>
                    <strong>Increased Information Bandwidth:</strong> With <Equation>{`n`}</Equation> streams, the residual pathway carries <Equation>{`n \\times`}</Equation> more information. This is especially valuable for deep networks where the single stream becomes a bottleneck.
                </ListItem>
                <ListItem>
                    <strong>Richer Inter-Layer Dependencies:</strong> The mixing matrices allow layer <Equation>{`l+1`}</Equation> to access information from multiple "versions" of the past, not just the immediately preceding state.
                </ListItem>
                <ListItem>
                    <strong>Decoupled Depth and Width:</strong> HC provides benefits similar to increasing model width but at the residual level, which can be more parameter-efficient.
                </ListItem>
            </List>

            {/* Hyper-Connections Architecture Diagram */}
            <div className="w-full overflow-x-auto my-8 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                <svg viewBox="0 0 900 580" className="w-full min-w-[800px] font-sans">
                    <defs>
                        <marker id="arrow-hc" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#64748b" />
                        </marker>
                    </defs>

                    {/* Standard Residual (Left Side) */}
                    <g transform="translate(150, 30)">
                        <text x="0" y="0" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">Standard Residual</text>

                        {/* h^L output */}
                        <rect x="-35" y="25" width="70" height="24" rx="3" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="0" y="41" textAnchor="middle" fontSize="10" fill="#1e40af">h^L</text>
                        <path d="M 0 49 L 0 60" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow-hc)" />

                        {/* Ellipsis */}
                        <text x="0" y="85" textAnchor="middle" fontSize="16" fill="#64748b">⋮</text>

                        {/* FFN Layer 2 */}
                        <circle cx="0" cy="115" r="10" fill="white" stroke="#64748b" strokeWidth="1.5" />
                        <text x="0" y="119" textAnchor="middle" fontSize="11" fill="#64748b">+</text>
                        <rect x="-70" y="105" width="45" height="22" rx="3" fill="white" stroke="#64748b" strokeWidth="1.5" />
                        <text x="-47" y="120" textAnchor="middle" fontSize="9" fill="#334155">FFN</text>
                        <path d="M -47 127 L -47 145 Q -47 155 -37 155 L -10 155 L -10 125" fill="none" stroke="#64748b" strokeWidth="1.2" />
                        <path d="M -25 105 L -25 90 Q -25 80 -15 80 L 0 80 L 0 105" fill="none" stroke="#64748b" strokeWidth="1.2" />

                        {/* Attention Layer 2 */}
                        <circle cx="0" cy="175" r="10" fill="white" stroke="#64748b" strokeWidth="1.5" />
                        <text x="0" y="179" textAnchor="middle" fontSize="11" fill="#64748b">+</text>
                        <rect x="-80" y="165" width="55" height="22" rx="3" fill="white" stroke="#64748b" strokeWidth="1.5" />
                        <text x="-52" y="180" textAnchor="middle" fontSize="9" fill="#334155">Attention</text>
                        <path d="M -52 187 L -52 210 Q -52 220 -42 220 L -10 220 L -10 185" fill="none" stroke="#64748b" strokeWidth="1.2" />
                        <path d="M -25 165 L -25 145 Q -25 135 -15 135 L 0 135 L 0 165" fill="none" stroke="#64748b" strokeWidth="1.2" />

                        {/* FFN Layer 1 */}
                        <circle cx="0" cy="245" r="10" fill="white" stroke="#64748b" strokeWidth="1.5" />
                        <text x="0" y="249" textAnchor="middle" fontSize="11" fill="#64748b">+</text>
                        <rect x="-70" y="235" width="45" height="22" rx="3" fill="white" stroke="#64748b" strokeWidth="1.5" />
                        <text x="-47" y="250" textAnchor="middle" fontSize="9" fill="#334155">FFN</text>
                        <path d="M -47 257 L -47 280 Q -47 290 -37 290 L -10 290 L -10 255" fill="none" stroke="#64748b" strokeWidth="1.2" />
                        <path d="M -25 235 L -25 215 Q -25 205 -15 205 L 0 205 L 0 235" fill="none" stroke="#64748b" strokeWidth="1.2" />

                        {/* Attention Layer 1 */}
                        <circle cx="0" cy="310" r="10" fill="white" stroke="#64748b" strokeWidth="1.5" />
                        <text x="0" y="314" textAnchor="middle" fontSize="11" fill="#64748b">+</text>
                        <rect x="-80" y="300" width="55" height="22" rx="3" fill="white" stroke="#64748b" strokeWidth="1.5" />
                        <text x="-52" y="315" textAnchor="middle" fontSize="9" fill="#334155">Attention</text>
                        <path d="M -52 322 L -52 345 Q -52 355 -42 355 L -10 355 L -10 320" fill="none" stroke="#64748b" strokeWidth="1.2" />
                        <path d="M -25 300 L -25 280 Q -25 270 -15 270 L 0 270 L 0 300" fill="none" stroke="#64748b" strokeWidth="1.2" />

                        {/* h^0 input */}
                        <path d="M 0 320 L 0 360" fill="none" stroke="#64748b" strokeWidth="1.5" />
                        <rect x="-35" y="365" width="70" height="24" rx="3" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="0" y="381" textAnchor="middle" fontSize="10" fill="#1e40af">h⁰</text>

                        {/* Caption */}
                        <text x="0" y="410" textAnchor="middle" fontSize="10" fill="#64748b">(a) Transformer with</text>
                        <text x="0" y="422" textAnchor="middle" fontSize="10" fill="#64748b">Residual Connections</text>
                    </g>

                    {/* Divider */}
                    <line x1="320" y1="20" x2="320" y2="450" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8,4" />

                    {/* Hyper-Connections (Right Side) */}
                    <g transform="translate(600, 30)">
                        <text x="0" y="0" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">Hyper-Connections (n=2)</text>

                        {/* h^L output at top */}
                        <rect x="-35" y="22" width="70" height="22" rx="3" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="0" y="37" textAnchor="middle" fontSize="10" fill="#1e40af">h^L</text>
                        <path d="M 0 44 L 0 52" fill="none" stroke="#64748b" strokeWidth="1.2" />

                        {/* Final merge + node */}
                        <circle cx="0" cy="62" r="9" fill="white" stroke="#64748b" strokeWidth="1.5" />
                        <text x="0" y="66" textAnchor="middle" fontSize="10" fill="#64748b">+</text>

                        {/* Two output streams h_1^L (blue) and h_2^L (yellow) */}
                        <rect x="-80" y="78" width="55" height="20" rx="3" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="-52" y="92" textAnchor="middle" fontSize="9" fill="#1e40af">h₁^L</text>
                        <rect x="25" y="78" width="55" height="20" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                        <text x="52" y="92" textAnchor="middle" fontSize="9" fill="#92400e">h₂^L</text>

                        {/* Connections from h₁^L and h₂^L to final + */}
                        <path d="M -52 78 L -52 71 L -9 71 L -9 62" fill="none" stroke="#3b82f6" strokeWidth="1.2" />
                        <path d="M 52 78 L 52 71 L 9 71 L 9 62" fill="none" stroke="#d97706" strokeWidth="1.2" />

                        {/* Ellipsis */}
                        <text x="0" y="120" textAnchor="middle" fontSize="14" fill="#64748b">⋮</text>

                        {/* === Layer 2: FFN === */}
                        {/* β coefficients (green) for skip paths */}
                        <rect x="-95" y="132" width="22" height="16" rx="2" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                        <text x="-84" y="143" textAnchor="middle" fontSize="7" fill="#166534">β₁²</text>
                        <rect x="73" y="132" width="22" height="16" rx="2" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                        <text x="84" y="143" textAnchor="middle" fontSize="7" fill="#166534">β₂²</text>

                        {/* Side + nodes (receive β skip connections) */}
                        <circle cx="-52" cy="155" r="8" fill="white" stroke="#64748b" strokeWidth="1" />
                        <text x="-52" y="158" textAnchor="middle" fontSize="9" fill="#64748b">+</text>
                        <circle cx="52" cy="155" r="8" fill="white" stroke="#64748b" strokeWidth="1" />
                        <text x="52" y="158" textAnchor="middle" fontSize="9" fill="#64748b">+</text>

                        {/* FFN block */}
                        <rect x="-30" y="135" width="40" height="20" rx="3" fill="white" stroke="#64748b" strokeWidth="1.5" />
                        <text x="-10" y="149" textAnchor="middle" fontSize="9" fill="#334155">FFN</text>

                        {/* Central + node (aggregates α-weighted inputs to FFN) */}
                        <circle cx="-10" cy="162" r="6" fill="white" stroke="#64748b" strokeWidth="1" />
                        <text x="-10" y="165" textAnchor="middle" fontSize="7" fill="#64748b">+</text>

                        {/* Connections: β to side + nodes */}
                        <path d="M -84 148 L -84 155 L -60 155" fill="none" stroke="#16a34a" strokeWidth="1" />
                        <path d="M 84 148 L 84 155 L 60 155" fill="none" stroke="#16a34a" strokeWidth="1" />

                        {/* Connections: side + nodes UP to h₁^L and h₂^L */}
                        <path d="M -52 147 L -52 98" fill="none" stroke="#3b82f6" strokeWidth="1.2" />
                        <path d="M 52 147 L 52 98" fill="none" stroke="#d97706" strokeWidth="1.2" />

                        {/* Connections: FFN output to side + nodes */}
                        <path d="M -30 145 L -44 155" fill="none" stroke="#64748b" strokeWidth="1" />
                        <path d="M 10 145 L 44 155" fill="none" stroke="#64748b" strokeWidth="1" />

                        {/* Connections: central + to FFN */}
                        <path d="M -10 156 L -10 155" fill="none" stroke="#64748b" strokeWidth="1" />

                        {/* α coefficients row */}
                        <g transform="translate(0, 175)">
                            <rect x="-100" y="0" width="20" height="14" rx="2" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
                            <text x="-90" y="10" textAnchor="middle" fontSize="6" fill="#1e40af">α₁,₀²</text>
                            <rect x="-78" y="0" width="20" height="14" rx="2" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
                            <text x="-68" y="10" textAnchor="middle" fontSize="6" fill="#1e40af">α₂,₀²</text>
                            <rect x="-38" y="0" width="20" height="14" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
                            <text x="-28" y="10" textAnchor="middle" fontSize="6" fill="#92400e">α₁,₁²</text>
                            <rect x="-16" y="0" width="20" height="14" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
                            <text x="-6" y="10" textAnchor="middle" fontSize="6" fill="#92400e">α₂,₁²</text>
                            <rect x="58" y="0" width="20" height="14" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
                            <text x="68" y="10" textAnchor="middle" fontSize="6" fill="#92400e">α₁,₂²</text>
                            <rect x="80" y="0" width="20" height="14" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
                            <text x="90" y="10" textAnchor="middle" fontSize="6" fill="#92400e">α₂,₂²</text>
                        </g>

                        {/* Connections: α coefficients UP to central + node */}
                        <path d="M -90 175 L -90 170 L -15 170 L -15 168" fill="none" stroke="#3b82f6" strokeWidth="0.8" />
                        <path d="M -68 175 L -68 172 L -12 172 L -12 168" fill="none" stroke="#3b82f6" strokeWidth="0.8" />
                        <path d="M -28 175 L -28 170 L -8 170 L -8 168" fill="none" stroke="#d97706" strokeWidth="0.8" />
                        <path d="M -6 175 L -6 172 L -5 172 L -5 168" fill="none" stroke="#d97706" strokeWidth="0.8" />

                        {/* Streams h_1^2 and h_2^2 */}
                        <rect x="-80" y="195" width="55" height="18" rx="3" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="-52" y="207" textAnchor="middle" fontSize="8" fill="#1e40af">h₁²</text>
                        <rect x="25" y="195" width="55" height="18" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                        <text x="52" y="207" textAnchor="middle" fontSize="8" fill="#92400e">h₂²</text>

                        {/* Cross-connections from h₁² UP to α coefficients (blue stream to blue αs and yellow αs) */}
                        <path d="M -65 195 L -65 192 L -90 192 L -90 189" fill="none" stroke="#3b82f6" strokeWidth="1" />
                        <path d="M -52 195 L -52 192 L -68 192 L -68 189" fill="none" stroke="#3b82f6" strokeWidth="1" />
                        <path d="M -40 195 L -40 192 L -28 192 L -28 189" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.6" />
                        <path d="M -35 195 L -35 191 L -6 191 L -6 189" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.6" />

                        {/* Cross-connections from h₂² UP to α coefficients (yellow stream to yellow αs) */}
                        <path d="M 40 195 L 40 192 L 68 192 L 68 189" fill="none" stroke="#d97706" strokeWidth="1" />
                        <path d="M 52 195 L 52 192 L 90 192 L 90 189" fill="none" stroke="#d97706" strokeWidth="1" />
                        <path d="M 60 195 L 60 191 L -28 191 L -28 189" fill="none" stroke="#d97706" strokeWidth="1" opacity="0.5" />
                        <path d="M 65 195 L 65 190 L -6 190 L -6 189" fill="none" stroke="#d97706" strokeWidth="1" opacity="0.5" />

                        {/* === Layer 1: Attention === */}
                        {/* β coefficients */}
                        <rect x="-95" y="235" width="22" height="16" rx="2" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                        <text x="-84" y="246" textAnchor="middle" fontSize="7" fill="#166534">β₁¹</text>
                        <rect x="73" y="235" width="22" height="16" rx="2" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                        <text x="84" y="246" textAnchor="middle" fontSize="7" fill="#166534">β₂¹</text>

                        {/* Side + nodes */}
                        <circle cx="-52" cy="258" r="8" fill="white" stroke="#64748b" strokeWidth="1" />
                        <text x="-52" y="261" textAnchor="middle" fontSize="9" fill="#64748b">+</text>
                        <circle cx="52" cy="258" r="8" fill="white" stroke="#64748b" strokeWidth="1" />
                        <text x="52" y="261" textAnchor="middle" fontSize="9" fill="#64748b">+</text>

                        {/* Attention block */}
                        <rect x="-40" y="238" width="55" height="20" rx="3" fill="white" stroke="#64748b" strokeWidth="1.5" />
                        <text x="-12" y="252" textAnchor="middle" fontSize="9" fill="#334155">Attention</text>

                        {/* Central + node */}
                        <circle cx="-12" cy="265" r="6" fill="white" stroke="#64748b" strokeWidth="1" />
                        <text x="-12" y="268" textAnchor="middle" fontSize="7" fill="#64748b">+</text>

                        {/* Connections: β to side + nodes */}
                        <path d="M -84 251 L -84 258 L -60 258" fill="none" stroke="#16a34a" strokeWidth="1" />
                        <path d="M 84 251 L 84 258 L 60 258" fill="none" stroke="#16a34a" strokeWidth="1" />

                        {/* Connections: side + nodes UP to h₁² and h₂² */}
                        <path d="M -52 250 L -52 213" fill="none" stroke="#3b82f6" strokeWidth="1.2" />
                        <path d="M 52 250 L 52 213" fill="none" stroke="#d97706" strokeWidth="1.2" />

                        {/* Connections: Attention output to side + nodes */}
                        <path d="M -40 248 L -44 258" fill="none" stroke="#64748b" strokeWidth="1" />
                        <path d="M 15 248 L 44 258" fill="none" stroke="#64748b" strokeWidth="1" />

                        {/* α coefficients row */}
                        <g transform="translate(0, 278)">
                            <rect x="-100" y="0" width="20" height="14" rx="2" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
                            <text x="-90" y="10" textAnchor="middle" fontSize="6" fill="#1e40af">α₁,₀¹</text>
                            <rect x="-78" y="0" width="20" height="14" rx="2" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
                            <text x="-68" y="10" textAnchor="middle" fontSize="6" fill="#1e40af">α₂,₀¹</text>
                            <rect x="-38" y="0" width="20" height="14" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
                            <text x="-28" y="10" textAnchor="middle" fontSize="6" fill="#92400e">α₁,₁¹</text>
                            <rect x="-16" y="0" width="20" height="14" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
                            <text x="-6" y="10" textAnchor="middle" fontSize="6" fill="#92400e">α₂,₁¹</text>
                            <rect x="58" y="0" width="20" height="14" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
                            <text x="68" y="10" textAnchor="middle" fontSize="6" fill="#92400e">α₁,₂¹</text>
                            <rect x="80" y="0" width="20" height="14" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
                            <text x="90" y="10" textAnchor="middle" fontSize="6" fill="#92400e">α₂,₂¹</text>
                        </g>

                        {/* Connections: α coefficients UP to central + node */}
                        <path d="M -90 278 L -90 273 L -17 273 L -17 271" fill="none" stroke="#3b82f6" strokeWidth="0.8" />
                        <path d="M -68 278 L -68 275 L -14 275 L -14 271" fill="none" stroke="#3b82f6" strokeWidth="0.8" />
                        <path d="M -28 278 L -28 273 L -10 273 L -10 271" fill="none" stroke="#d97706" strokeWidth="0.8" />
                        <path d="M -6 278 L -6 275 L -7 275 L -7 271" fill="none" stroke="#d97706" strokeWidth="0.8" />

                        {/* Streams h_1^1 and h_2^1 */}
                        <rect x="-80" y="298" width="55" height="18" rx="3" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="-52" y="310" textAnchor="middle" fontSize="8" fill="#1e40af">h₁¹</text>
                        <rect x="25" y="298" width="55" height="18" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                        <text x="52" y="310" textAnchor="middle" fontSize="8" fill="#92400e">h₂¹</text>

                        {/* Cross-connections from h₁¹ UP to α coefficients */}
                        <path d="M -65 298 L -65 295 L -90 295 L -90 292" fill="none" stroke="#3b82f6" strokeWidth="1" />
                        <path d="M -52 298 L -52 295 L -68 295 L -68 292" fill="none" stroke="#3b82f6" strokeWidth="1" />
                        <path d="M -40 298 L -40 294 L -28 294 L -28 292" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.6" />
                        <path d="M -35 298 L -35 293 L -6 293 L -6 292" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.6" />

                        {/* Cross-connections from h₂¹ UP to α coefficients */}
                        <path d="M 40 298 L 40 295 L 68 295 L 68 292" fill="none" stroke="#d97706" strokeWidth="1" />
                        <path d="M 52 298 L 52 295 L 90 295 L 90 292" fill="none" stroke="#d97706" strokeWidth="1" />
                        <path d="M 60 298 L 60 294 L -28 294 L -28 292" fill="none" stroke="#d97706" strokeWidth="1" opacity="0.5" />
                        <path d="M 65 298 L 65 293 L -6 293 L -6 292" fill="none" stroke="#d97706" strokeWidth="1" opacity="0.5" />

                        {/* h_1^0 and h_2^0 streams */}
                        <rect x="-80" y="340" width="55" height="18" rx="3" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="-52" y="352" textAnchor="middle" fontSize="8" fill="#1e40af">h₁⁰</text>
                        <rect x="25" y="340" width="55" height="18" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                        <text x="52" y="352" textAnchor="middle" fontSize="8" fill="#92400e">h₂⁰</text>

                        {/* Connections from h_1^0 and h_2^0 UP to h_1^1 and h_2^1 */}
                        <path d="M -52 340 L -52 316" fill="none" stroke="#3b82f6" strokeWidth="1.2" />
                        <path d="M 52 340 L 52 316" fill="none" stroke="#d97706" strokeWidth="1.2" />

                        {/* Repeat operation */}
                        <path d="M -52 358 L -52 375 L -25 375" fill="none" stroke="#3b82f6" strokeWidth="1.2" />
                        <path d="M 52 358 L 52 375 L 25 375" fill="none" stroke="#d9748b" strokeWidth="1.2" />
                        <rect x="-25" y="370" width="50" height="18" rx="3" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
                        <text x="0" y="382" textAnchor="middle" fontSize="8" fill="#475569">Repeat</text>
                        <path d="M 0 388 L 0 400" fill="none" stroke="#64748b" strokeWidth="1.2" />

                        {/* h^0 input */}
                        <rect x="-35" y="405" width="70" height="22" rx="3" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="0" y="420" textAnchor="middle" fontSize="10" fill="#1e40af">h⁰</text>

                        {/* Caption */}
                        <text x="0" y="448" textAnchor="middle" fontSize="10" fill="#64748b">(b) Transformer with</text>
                        <text x="0" y="460" textAnchor="middle" fontSize="10" fill="#64748b">Hyper-Connections</text>
                    </g>

                    {/* Legend */}
                    <g transform="translate(450, 500)">
                        <rect x="-200" y="0" width="16" height="12" rx="2" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
                        <text x="-180" y="10" fontSize="9" fill="#475569">Stream 1 (h₁)</text>
                        <rect x="-100" y="0" width="16" height="12" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
                        <text x="-80" y="10" fontSize="9" fill="#475569">Stream 2 (h₂)</text>
                        <rect x="0" y="0" width="16" height="12" rx="2" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                        <text x="20" y="10" fontSize="9" fill="#475569">β (skip weights)</text>
                        <text x="120" y="10" fontSize="9" fill="#475569">α (mixing coefficients)</text>
                    </g>
                </svg>
            </div>

            <Header4>The Instability Problem</Header4>
            <Paragraph>
                However, naive HC encounters a critical issue: <strong>training instability at scale</strong>. The problem is that learnable mixing matrices <Equation>{`M_l`}</Equation> can cause signal magnitudes to explode or vanish through depth.
            </Paragraph>
            <Paragraph>
                Consider the composition of mixing matrices over <Equation>{`L`}</Equation> layers:
            </Paragraph>
            <Equation block>
                {`M_L M_{L-1} \\cdots M_1`}
            </Equation>
            <Paragraph>
                If the spectral radius of any <Equation>{`M_l`}</Equation> exceeds 1, signals grow exponentially. DeepSeek reported that in a 27B parameter model, unconstrained HC caused signal gains exceeding <strong>3,000×</strong>, leading to training divergence.
            </Paragraph>

            <Callout type="warning" title="The Identity Mapping Crisis">
                Standard residual connections preserve identity: with <Equation>{`F = 0`}</Equation>, the network is exactly identity. HC with learnable <Equation>{`M`}</Equation> breaks this—even if <Equation>{`F = 0`}</Equation>, the mixing matrices transform the signal. This loss of the identity property is the root cause of instability.
            </Callout>

            <Header3>mHC: Manifold-Constrained Hyper-Connections</Header3>
            <Paragraph>
                <strong>mHC</strong> (DeepSeek, 2024) solves the instability problem by constraining the mixing matrices to a mathematical manifold that guarantees stable signal flow.
            </Paragraph>

            <Header4>The Birkhoff Polytope Constraint</Header4>
            <Paragraph>
                mHC constrains each mixing matrix <Equation>{`M_l`}</Equation> to be <strong>doubly stochastic</strong>: both rows and columns sum to 1.
            </Paragraph>
            <Equation block>
                {`M \\in \\mathcal{B} = \\{ M : M_{ij} \\geq 0, \\sum_j M_{ij} = 1, \\sum_i M_{ij} = 1 \\}`}
            </Equation>
            <Paragraph>
                This set is called the <strong>Birkhoff Polytope</strong>. Key properties:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Norm Preservation:</strong> Doubly stochastic matrices preserve the <Equation>{`\\ell_1`}</Equation> norm of their input. Signal magnitudes cannot explode.
                </ListItem>
                <ListItem>
                    <strong>Compositional Closure:</strong> The product of doubly stochastic matrices is doubly stochastic. Stability propagates through depth.
                </ListItem>
                <ListItem>
                    <strong>Identity Included:</strong> The identity matrix is doubly stochastic, so the network can represent identity when needed.
                </ListItem>
            </List>

            <Header4>Sinkhorn Projection</Header4>
            <Paragraph>
                To enforce the constraint, mHC uses <strong>Sinkhorn iterations</strong>—alternating row and column normalization:
            </Paragraph>
            <Equation block>
                {`M^{(k+1)} = \\text{RowNorm}(\\text{ColNorm}(M^{(k)}))`}
            </Equation>
            <Paragraph>
                This converges to a doubly stochastic matrix in a few iterations. In practice, 3-5 Sinkhorn iterations suffice.
            </Paragraph>

            <Header4>mHC Results</Header4>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Model Size</th>
                            <th className="px-4 py-2 border-b">Training Stability</th>
                            <th className="px-4 py-2 border-b">Overhead</th>
                            <th className="px-4 py-2 border-b">Performance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">3B</td>
                            <td className="px-4 py-2">Stable</td>
                            <td className="px-4 py-2">6-7%</td>
                            <td className="px-4 py-2">Lower loss vs. baseline</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">7B</td>
                            <td className="px-4 py-2">Stable</td>
                            <td className="px-4 py-2">6-7%</td>
                            <td className="px-4 py-2">Improved benchmarks</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">27B</td>
                            <td className="px-4 py-2">Stable (HC diverged)</td>
                            <td className="px-4 py-2">6-7%</td>
                            <td className="px-4 py-2">+5 pts on BBH</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Callout type="tip" title="Mass-Conserving Routing">
                Think of doubly stochastic matrices as "mass-conserving routers." Each stream contributes its full signal (rows sum to 1), and each output receives a complete signal (columns sum to 1). No information is lost or duplicated—it's just redistributed.
            </Callout>

            <Header3>Infrastructure Optimizations</Header3>
            <Paragraph>
                Residual stream widening introduces engineering challenges. The mHC paper details several infrastructure optimizations:
            </Paragraph>

            <Header4>Memory-Efficient Mixing</Header4>
            <Paragraph>
                With <Equation>{`n`}</Equation> streams of dimension <Equation>{`d`}</Equation>, the mixing operation is <Equation>{`O(n^2 d)`}</Equation>. For small <Equation>{`n`}</Equation> (typically 2-4), this is dominated by attention's <Equation>{`O(s^2 d)`}</Equation> where <Equation>{`s`}</Equation> is sequence length. But at scale, mixing can become a bottleneck.
            </Paragraph>
            <Paragraph>
                mHC uses fused kernels that combine the Sinkhorn projection and mixing into a single memory-efficient operation, avoiding materialization of intermediate matrices.
            </Paragraph>

            <Header4>Sparse Mixing Patterns</Header4>
            <Paragraph>
                Not all streams need to mix with all others. mHC explores sparse mixing patterns (e.g., each stream mixes only with its neighbors) that reduce compute while retaining most of the benefit.
            </Paragraph>

            <Header3>Beyond Transformers: GNN Adaptation</Header3>
            <Paragraph>
                An interesting question is whether residual stream scaling is Transformer-specific or a general principle. Initial exploration suggests:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>GNNs:</strong> Graph Neural Networks face similar over-smoothing problems as depth increases—node representations become indistinguishable. Multi-stream residuals could help preserve node diversity.
                </ListItem>
                <ListItem>
                    <strong>State-Space Models:</strong> SSMs like Mamba use different recurrence patterns, but the "residual stream as information highway" concept still applies.
                </ListItem>
                <ListItem>
                    <strong>Key Insight:</strong> The doubly stochastic constraint is architecture-agnostic—it's a general way to ensure stable mixing regardless of the surrounding computation.
                </ListItem>
            </List>

            <Callout type="info" title="The Residual Stream Perspective">
                Anthropic's "residual stream as information highway" framing has become influential in mechanistic interpretability. Hyper-Connections extend this: instead of a single highway, the network operates multiple parallel highways with controlled merging. This may enable new interpretability approaches that track information flow across streams.
            </Callout>

            <Header3>Summary: HC vs. mHC</Header3>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Aspect</th>
                            <th className="px-4 py-2 border-b">HC</th>
                            <th className="px-4 py-2 border-b">mHC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Mixing matrices</td>
                            <td className="px-4 py-2">Unconstrained learnable</td>
                            <td className="px-4 py-2">Doubly stochastic</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Identity property</td>
                            <td className="px-4 py-2">Lost</td>
                            <td className="px-4 py-2">Preserved (identity ∈ Birkhoff)</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Signal stability</td>
                            <td className="px-4 py-2">Explodes at scale</td>
                            <td className="px-4 py-2">Bounded by construction</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Scalability</td>
                            <td className="px-4 py-2">~7B max</td>
                            <td className="px-4 py-2">27B+ demonstrated</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Training overhead</td>
                            <td className="px-4 py-2">~5%</td>
                            <td className="px-4 py-2">~6-7% (Sinkhorn adds ~1%)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Section>
    );
};

export default ResidualStreamScaling;
