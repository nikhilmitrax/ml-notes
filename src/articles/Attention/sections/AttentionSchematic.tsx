import React, { useCallback } from 'react';
import ReactFlow, {
    Background,
    Controls,
    Handle,
    Position,
    MarkerType,
    addEdge,
    Node,
    useNodesState,
    useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

// --- 1. Custom Node Components ---

// The Circular Nodes (e.g., @, +, Projections)
const CircleNode = ({ id, data }) => {
    return (
        <div
            title={id}
            style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: '2px solid #fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#111',
                color: '#fff',
                fontSize: '14px',
                fontFamily: 'monospace',
                position: 'relative',
                cursor: 'help'
            }}
        >
            <Handle type="target" position={Position.Left} style={{ background: '#fff' }} />
            <div style={{ textAlign: 'center' }}>
                {data.label}
                {data.sub && <div style={{ fontSize: '10px', color: '#aaa' }}>{data.sub}</div>}
            </div>
            <Handle type="source" position={Position.Right} style={{ background: '#fff' }} />

            {/* specialized handles for top/bottom connections if needed */}
            {data.topHandle && <Handle type="target" position={Position.Top} id="top" style={{ background: '#fff' }} />}
            {data.bottomHandle && <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: '#fff' }} />}
        </div>
    );
};

// The Rectangular Nodes (e.g., Reshape, Softmax)
const LayerNode = ({ id, data }) => {
    return (
        <div
            title={id}
            style={{
                padding: '10px 20px',
                borderRadius: '12px',
                border: '2px solid #fff',
                background: '#111',
                color: '#fff',
                fontFamily: 'monospace',
                minWidth: '120px',
                textAlign: 'center',
                cursor: 'help'
            }}
        >
            <Handle type="target" position={Position.Left} style={{ background: '#fff' }} />
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{data.label}</div>
            {data.sub && <div style={{ fontSize: '12px', color: '#ccc' }}>{data.sub}</div>}
            {data.sub2 && <div style={{ fontSize: '12px', color: '#ccc' }}>{data.sub2}</div>}
            <Handle type="source" position={Position.Right} style={{ background: '#fff' }} />

            {/* Specific handle for the final reshape output going down */}
            {data.bottomSource && <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: '#fff' }} />}
        </div>
    );
};

// Plain Text Node (for inputs like x1, x2 or the "masks" label)
const LabelNode = ({ id, data }) => {
    return (
        <div
            title={id}
            style={{ color: '#fff', fontFamily: 'monospace', fontSize: '16px', cursor: 'help' }}
        >
            {data.label}
            <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
            {data.targetBottom && <Handle type="source" position={Position.Bottom} id="bottom" style={{ opacity: 0 }} />}
        </div>
    );
};

const nodeTypes = {
    circle: CircleNode,
    layer: LayerNode,
    text: LabelNode,
};

// --- 2. The Data (Nodes & Edges) ---

const initialNodes = [
    // --- Inputs ---
    // Align x1, x2, and left projs at x=200 for a clean left column
    { id: 'x1', type: 'text', position: { x: 200, y: 50 }, data: { label: 'x1 [BTD]' } },
    { id: 'x2', type: 'text', position: { x: 200, y: 300 }, data: { label: 'x2 [BT\'D\']', targetBottom: true } },

    // --- Q Path (Top) ---
    { id: 'proj_q', type: 'circle', position: { x: 350, y: 50 }, data: { label: '[DNH]' } },
    { id: 'reshape_q', type: 'layer', position: { x: 550, y: 50 }, data: { label: 'Reshape', sub: 'BT[N]H', sub2: 'BT[KG]H', bottomSource: true } },

    // --- K Path (Middle) ---
    { id: 'proj_k', type: 'circle', position: { x: 350, y: 300 }, data: { label: '[D\'KH]' } },

    // --- V Path (Bottom) ---
    { id: 'proj_v', type: 'circle', position: { x: 350, y: 550 }, data: { label: '[D\'KH]' } },

    // --- Central Attention Flow (Middle Column) ---
    // Vertical alignment line around x=600-800 range

    // MatMul 1 (Q @ K)
    { id: 'matmul_1', type: 'circle', position: { x: 550, y: 300 }, data: { label: '@', topHandle: true } },

    // Mask injection
    { id: 'masks', type: 'text', position: { x: 650, y: 200 }, data: { label: 'masks', targetBottom: true } },
    { id: 'add_mask', type: 'circle', position: { x: 700, y: 300 }, data: { label: '+', topHandle: true } },

    // Softmax and MatMul2 Stack (x=850)
    { id: 'softmax', type: 'layer', position: { x: 850, y: 300 }, data: { label: 'Softmax', bottomSource: true } },

    // MatMul 2 (Score @ V) - Vertically aligned with Softmax
    { id: 'matmul_2', type: 'circle', position: { x: 850, y: 550 }, data: { label: '@', bottomHandle: true, topHandle: true } },

    // --- Output Stack (Right Side x=1050) ---
    { id: 'reshape_out', type: 'layer', position: { x: 1050, y: 300 }, data: { label: 'Reshape', sub: 'BT[KG]H', sub2: 'BT[N]H', bottomSource: true } },
    { id: 'proj_out', type: 'circle', position: { x: 1050, y: 500 }, data: { label: '[NHD]', bottomHandle: true, topHandle: true } },
    { id: 'final_out', type: 'text', position: { x: 1050, y: 650 }, data: { label: '[BTD]' } },
];

const edgeOptions = {
    type: 'smoothstep',
    style: { stroke: '#fff', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#fff' },
    labelStyle: { fill: '#fff', fontSize: 12, fontFamily: 'monospace', fontWeight: 500 },
    labelBgStyle: { fill: '#080808', fillOpacity: 0.8 },
    labelBgPadding: [4, 2] as [number, number],
    labelShowBg: true,
};

const initialEdges = [
    // x1 -> Q Proj
    { id: 'e_x1_pq', source: 'x1', target: 'proj_q', ...edgeOptions },
    // Q Proj -> Q Reshape
    { id: 'e_pq_rs', source: 'proj_q', target: 'reshape_q', label: '[BTNH]', ...edgeOptions },
    // Q Reshape -> MatMul1 (Down)
    { id: 'e_rs_mm1', source: 'reshape_q', target: 'matmul_1', sourceHandle: 'bottom', targetHandle: 'top', label: 'Q [BTKGH]', ...edgeOptions },

    // x2 -> K Proj
    { id: 'e_x2_pk', source: 'x2', target: 'proj_k', ...edgeOptions },
    // K Proj -> MatMul1
    { id: 'e_pk_mm1', source: 'proj_k', target: 'matmul_1', label: 'K [BT\'KH]', ...edgeOptions },

    // x2 -> V Proj (Split from x2, go down to V proj)
    { id: 'e_x2_pv', source: 'x2', target: 'proj_v', sourceHandle: 'bottom', ...edgeOptions, pathOptions: { borderRadius: 20 } },

    // V Proj -> MatMul2 (The Long Path)
    // - Goes Right, then Up to MatMul2 bottom
    { id: 'e_pv_mm2', source: 'proj_v', target: 'matmul_2', label: 'V [BT\'KH]', ...edgeOptions },

    // MatMul1 -> Add
    { id: 'e_mm1_add', source: 'matmul_1', target: 'add_mask', label: '=[BTT\'KG]', ...edgeOptions },
    // Masks -> Add
    { id: 'e_mask_add', source: 'masks', target: 'add_mask', targetHandle: 'top', ...edgeOptions, markerEnd: { type: MarkerType.ArrowClosed, color: '#fff' } },

    // Add -> Softmax
    { id: 'e_add_sm', source: 'add_mask', target: 'softmax', ...edgeOptions },

    // Softmax -> MatMul2
    { id: 'e_sm_mm2', source: 'softmax', target: 'matmul_2', label: 'Score [BTT\'KG]', sourceHandle: 'bottom', targetHandle: 'top', ...edgeOptions },

    // MatMul2 -> Reshape Out
    { id: 'e_mm2_rso', source: 'matmul_2', target: 'reshape_out', label: '=[BTKGH]', ...edgeOptions },

    // Reshape Out -> Proj Out (Down)
    { id: 'e_rso_po', source: 'reshape_out', target: 'proj_out', sourceHandle: 'bottom', targetHandle: 'top', label: '[BTNH]', ...edgeOptions },

    // Proj Out -> Final (Down)
    { id: 'e_po_fin', source: 'proj_out', target: 'final_out', sourceHandle: 'bottom', ...edgeOptions },
];

// --- 3. The Main Component ---

export default function AttentionSchematic() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as Node[]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <div style={{ width: '100%', height: '600px', background: '#000' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                nodeOrigin={[0.5, 0.5]}
                nodesDraggable={false}
                style={{ background: '#080808' }} // Dark background
            >
                <Background color="#333" gap={20} />

                {/* The Legend Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    padding: 20,
                    background: 'rgba(20, 20, 20, 0.9)',
                    border: '1px solid #444',
                    borderRadius: 8,
                    color: '#8cb4ff',
                    fontFamily: 'monospace',
                    fontSize: 14,
                    pointerEvents: 'none'
                }}>
                    <div style={{ marginBottom: 5 }}>B - Batch Size</div>
                    <div style={{ marginBottom: 5 }}>T/T' - Query/KV Length</div>
                    <div style={{ marginBottom: 5 }}>D/D' - Query/KV Dimension</div>
                    <div style={{ marginBottom: 5 }}>N/K - Query/KV Heads</div>
                    <div style={{ marginBottom: 5 }}>H - Head Dimension</div>
                    <div>G = n//k Query heads per KV</div>
                </div>
            </ReactFlow>
        </div>
    );
}