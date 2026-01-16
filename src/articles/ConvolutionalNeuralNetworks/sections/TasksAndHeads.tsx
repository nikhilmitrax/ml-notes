import React from 'react';
import { Target } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Callout from '../../../components/Callout';

const TasksAndHeads = () => {
    return (
        <Section title="Tasks & Heads" icon={Target}>
            <Header3>Classification Heads</Header3>

            <Header4>Standard: GAP + Linear</Header4>
            <List>
                <ListItem>Global Average Pooling: <Equation>{`(N, C, H, W) \\rightarrow (N, C)`}</Equation></ListItem>
                <ListItem>Linear layer: <Equation>{`(N, C) \\rightarrow (N, \\text{num\\_classes})`}</Equation></ListItem>
                <ListItem>No learnable params in pooling — reduces overfitting</ListItem>
                <ListItem>Input size agnostic (can use different resolutions at test time)</ListItem>
                <ListItem>Alternative: Global Max Pooling (captures strongest activation)</ListItem>
            </List>

            <Header4>Label Smoothing</Header4>
            <List>
                <ListItem>Soft targets instead of hard one-hot: <Equation>{`y_{soft} = (1 - \\epsilon) \\cdot y_{hard} + \\frac{\\epsilon}{K}`}</Equation></ListItem>
                <ListItem>Typical <Equation>{`\\epsilon = 0.1`}</Equation></ListItem>
                <ListItem>Benefits:
                    <List nested>
                        <ListItem>Prevents overconfidence</ListItem>
                        <ListItem>Better calibration</ListItem>
                        <ListItem>Regularization effect</ListItem>
                    </List>
                </ListItem>
                <ListItem>Reduces gap between logits of correct class and others</ListItem>
            </List>

            <Header3>Object Detection</Header3>

            <Header4>Anchor-Based Detection</Header4>
            <List>
                <ListItem>Predefined anchor boxes at multiple scales/aspect ratios</ListItem>
                <ListItem>Network predicts:
                    <List nested>
                        <ListItem>Classification: object class per anchor</ListItem>
                        <ListItem>Regression: offsets (Δx, Δy, Δw, Δh) to refine anchor</ListItem>
                    </List>
                </ListItem>
                <ListItem>Examples: Faster R-CNN, SSD, RetinaNet, YOLOv3</ListItem>
                <ListItem>Pros: stable training, well-understood</ListItem>
                <ListItem>Cons: anchor design is hyperparameter, many anchors needed</ListItem>
            </List>

            <Header4>Anchor-Free Detection</Header4>
            <List>
                <ListItem>Directly predict object centers and sizes</ListItem>
                <ListItem>Approaches:
                    <List nested>
                        <ListItem><strong>Keypoint-based</strong>: detect corners/centers (CornerNet, CenterNet)</ListItem>
                        <ListItem><strong>Point-based</strong>: predict distances to edges from each point (FCOS)</ListItem>
                    </List>
                </ListItem>
                <ListItem>Pros: simpler, fewer hyperparameters</ListItem>
                <ListItem>Cons: can struggle with dense/overlapping objects</ListItem>
                <ListItem>Modern: YOLO (v5+) uses anchor-free variants</ListItem>
            </List>

            <Header4>IoU Variants</Header4>
            <List>
                <ListItem><strong>IoU</strong>: Intersection over Union, standard overlap metric
                    <Equation block>{`\\text{IoU} = \\frac{|A \\cap B|}{|A \\cup B|}`}</Equation>
                </ListItem>
                <ListItem><strong>GIoU</strong>: adds penalty for gaps between boxes</ListItem>
                <ListItem><strong>DIoU</strong>: adds center distance penalty</ListItem>
                <ListItem><strong>CIoU</strong>: adds aspect ratio consistency</ListItem>
                <ListItem>IoU-based losses better for box regression than L1/L2</ListItem>
            </List>

            <Header4>Non-Maximum Suppression (NMS)</Header4>
            <List>
                <ListItem>Problem: many overlapping detections for same object</ListItem>
                <ListItem>Algorithm:
                    <List nested>
                        <ListItem>Sort detections by confidence</ListItem>
                        <ListItem>Keep highest confidence box</ListItem>
                        <ListItem>Remove boxes with IoU &gt; threshold (typically 0.5)</ListItem>
                        <ListItem>Repeat for remaining boxes</ListItem>
                    </List>
                </ListItem>
                <ListItem>Variants: Soft-NMS (decay scores instead of hard removal), class-agnostic NMS</ListItem>
                <ListItem>Bottleneck in real-time detection (sequential algorithm)</ListItem>
            </List>

            <Header3>Segmentation</Header3>

            <Header4>Semantic Segmentation</Header4>
            <List>
                <ListItem>Classify each pixel (no instance distinction)</ListItem>
                <ListItem>Output: <Equation>{`(N, \\text{num\\_classes}, H, W)`}</Equation></ListItem>
                <ListItem>Architectures: FCN, DeepLab, U-Net, PSPNet</ListItem>
            </List>

            <Header4>Instance Segmentation</Header4>
            <List>
                <ListItem>Detect + segment each object instance separately</ListItem>
                <ListItem>Approaches:
                    <List nested>
                        <ListItem><strong>Top-down</strong>: detect boxes, then segment within each (Mask R-CNN)</ListItem>
                        <ListItem><strong>Bottom-up</strong>: segment pixels, then group into instances</ListItem>
                    </List>
                </ListItem>
                <ListItem>Output: per-instance binary masks + class labels</ListItem>
            </List>

            <Header4>Panoptic Segmentation</Header4>
            <List>
                <ListItem>Unified: semantic + instance segmentation</ListItem>
                <ListItem>"Stuff" classes (sky, road): semantic segmentation</ListItem>
                <ListItem>"Thing" classes (car, person): instance segmentation</ListItem>
                <ListItem>Every pixel gets class + instance ID</ListItem>
                <ListItem>Metric: Panoptic Quality (PQ) = SQ × RQ</ListItem>
            </List>

            <Header4>Segmentation Losses</Header4>
            <List>
                <ListItem><strong>Cross-Entropy</strong>: standard per-pixel classification loss
                    <Equation block>{`\\mathcal{L}_{CE} = -\\frac{1}{N}\\sum_{i} y_i \\log(p_i)`}</Equation>
                </ListItem>
                <ListItem><strong>Dice Loss</strong>: overlap-based, handles class imbalance
                    <Equation block>{`\\mathcal{L}_{Dice} = 1 - \\frac{2|P \\cap G|}{|P| + |G|}`}</Equation>
                </ListItem>
                <ListItem><strong>Focal Loss</strong>: down-weights easy examples
                    <Equation block>{`\\mathcal{L}_{Focal} = -\\alpha(1-p)^\\gamma \\log(p)`}</Equation>
                    <List nested>
                        <ListItem><Equation>{`\\gamma = 2`}</Equation> typical; focuses on hard negatives</ListItem>
                        <ListItem>Critical for dense object detection (RetinaNet)</ListItem>
                    </List>
                </ListItem>
                <ListItem>Often combine: CE + Dice, or Focal + Dice</ListItem>
            </List>

            <Callout type="tip" title="Class Imbalance in Segmentation">
                Background often dominates. Use: weighted CE, focal loss, Dice loss, or oversample foreground regions.
            </Callout>

            <Header3>Keypoints & Pose Estimation</Header3>
            <List>
                <ListItem><strong>Task</strong>: locate anatomical keypoints (joints, landmarks)</ListItem>
                <ListItem>Output: <Equation>{`K`}</Equation> heatmaps, one per keypoint type</ListItem>
            </List>

            <Header4>Heatmap Regression</Header4>
            <List>
                <ListItem>Target: 2D Gaussian centered on keypoint location</ListItem>
                <ListItem>Network predicts heatmap, argmax gives coordinates</ListItem>
                <ListItem>Benefits:
                    <List nested>
                        <ListItem>Easier to train than direct coordinate regression</ListItem>
                        <ListItem>Captures spatial uncertainty</ListItem>
                        <ListItem>Multi-person: multiple peaks per heatmap</ListItem>
                    </List>
                </ListItem>
                <ListItem>Refinement: sub-pixel localization via soft-argmax or offset regression</ListItem>
            </List>

            <Header4>Top-Down vs Bottom-Up</Header4>
            <List>
                <ListItem><strong>Top-down</strong>: detect person → crop → estimate keypoints per person</ListItem>
                <ListItem><strong>Bottom-up</strong>: detect all keypoints → group into persons</ListItem>
                <ListItem>Top-down more accurate, bottom-up faster for multi-person</ListItem>
            </List>

            <Header3>Metric Learning with CNN Backbones</Header3>
            <List>
                <ListItem><strong>Goal</strong>: learn embeddings where similar items are close</ListItem>
                <ListItem>Architecture: CNN backbone → GAP → projection head → normalized embedding</ListItem>
            </List>

            <Header4>Contrastive Loss</Header4>
            <List>
                <ListItem>Positive pairs: pull together</ListItem>
                <ListItem>Negative pairs: push apart (up to margin)</ListItem>
                <ListItem>
                    <Equation block>{`\\mathcal{L} = \\frac{1}{2}(y \\cdot d^2 + (1-y) \\cdot \\max(0, m - d)^2)`}</Equation>
                </ListItem>
                <ListItem>Requires pair mining (hard negatives important)</ListItem>
            </List>

            <Header4>Triplet Loss</Header4>
            <List>
                <ListItem>Anchor, positive, negative triplets</ListItem>
                <ListItem>Enforce: <Equation>{`d(a, p) + m < d(a, n)`}</Equation>
                    <Equation block>{`\\mathcal{L} = \\max(0, d(a,p) - d(a,n) + m)`}</Equation>
                </ListItem>
                <ListItem>Hard triplet mining critical for training</ListItem>
                <ListItem>Semi-hard: negatives between positive and margin</ListItem>
            </List>

            <Header4>Applications</Header4>
            <List>
                <ListItem>Face recognition/verification</ListItem>
                <ListItem>Image retrieval (product search, reverse image search)</ListItem>
                <ListItem>Few-shot learning</ListItem>
                <ListItem>Person re-identification</ListItem>
            </List>

            <Callout type="info" title="Modern Metric Learning">
                InfoNCE / NT-Xent loss (contrastive learning) now more common than triplet loss. Uses in-batch negatives efficiently.
            </Callout>
        </Section>
    );
};

export default TasksAndHeads;
