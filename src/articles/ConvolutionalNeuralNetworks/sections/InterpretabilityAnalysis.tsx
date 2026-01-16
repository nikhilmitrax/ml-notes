import React from 'react';
import { Search } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Callout from '../../../components/Callout';

const InterpretabilityAnalysis = () => {
    return (
        <Section title="Interpretability & Analysis" icon={Search}>
            <Header3>Visualizing Filters & Feature Maps</Header3>

            <Header4>First Layer Filters</Header4>
            <List>
                <ListItem>Conv1 filters are directly interpretable — operate on RGB</ListItem>
                <ListItem>Typically learn: edges, color gradients, Gabor-like patterns</ListItem>
                <ListItem>Visualization: just reshape and display as images</ListItem>
                <ListItem>Healthy models show diverse, oriented edge detectors</ListItem>
            </List>

            <Header4>Deeper Layer Filters</Header4>
            <List>
                <ListItem>Not directly visualizable (high-dimensional input)</ListItem>
                <ListItem>Activation maximization: find input that maximally activates a unit</ListItem>
                <ListItem>Reveals: textures, parts, object concepts at different depths</ListItem>
                <ListItem>DeepDream: iterative optimization produces trippy visualizations</ListItem>
            </List>

            <Header4>Feature Map Visualization</Header4>
            <List>
                <ListItem>For input image, show activation of each channel</ListItem>
                <ListItem>Early layers: edge maps, color channels</ListItem>
                <ListItem>Middle layers: textures, patterns</ListItem>
                <ListItem>Late layers: object parts, high-level concepts</ListItem>
                <ListItem>Useful for debugging: are features activating on expected regions?</ListItem>
            </List>

            <Header3>Saliency Methods</Header3>

            <Header4>Gradient-Based Saliency</Header4>
            <List>
                <ListItem>Compute gradient of output class score w.r.t. input pixels</ListItem>
                <ListItem>High gradient magnitude = important pixels</ListItem>
                <ListItem>Simple but often noisy</ListItem>
            </List>

            <Header4>Grad-CAM</Header4>
            <List>
                <ListItem><strong>Gradient-weighted Class Activation Mapping</strong></ListItem>
                <ListItem>Uses gradients flowing into final conv layer</ListItem>
                <ListItem>Steps:
                    <List nested>
                        <ListItem>Compute gradients of class score w.r.t. feature maps</ListItem>
                        <ListItem>Global average pool gradients → importance weights per channel</ListItem>
                        <ListItem>Weighted combination of feature maps → heatmap</ListItem>
                        <ListItem>ReLU to keep positive contributions</ListItem>
                    </List>
                </ListItem>
                <ListItem>Coarse localization (resolution of last conv layer)</ListItem>
                <ListItem>Class-discriminative: shows what's relevant for specific class</ListItem>
            </List>

            <Header4>Guided Grad-CAM</Header4>
            <List>
                <ListItem>Combine Grad-CAM (coarse) with Guided Backprop (fine-grained)</ListItem>
                <ListItem>Element-wise multiply for high-resolution, class-specific saliency</ListItem>
            </List>

            <Header4>Other Methods</Header4>
            <List>
                <ListItem><strong>Integrated Gradients</strong>: attribute along path from baseline to input</ListItem>
                <ListItem><strong>SHAP</strong>: Shapley value-based attribution</ListItem>
                <ListItem><strong>Occlusion</strong>: mask regions, measure output change (slow but intuitive)</ListItem>
                <ListItem><strong>CAM</strong>: original, requires GAP before final FC (limited architectures)</ListItem>
            </List>

            <Callout type="warning" title="Saliency Limitations">
                Saliency maps can be misleading: sensitive to noise, may highlight irrelevant features, don't prove causality. Use for exploration, not proof of model reasoning.
            </Callout>

            <Header3>Failure Modes</Header3>

            <Header4>Texture Bias</Header4>
            <List>
                <ListItem>CNNs rely heavily on texture, less on shape (unlike humans)</ListItem>
                <ListItem>Example: elephant-textured cat classified as elephant</ListItem>
                <ListItem>Discovered by Geirhos et al. (2019) with stylized ImageNet</ListItem>
                <ListItem>Implications:
                    <List nested>
                        <ListItem>May fail on texture-shifted domains</ListItem>
                        <ListItem>Vulnerable to texture-based adversarial examples</ListItem>
                    </List>
                </ListItem>
                <ListItem>Mitigation: train on stylized images, augmentation diversity</ListItem>
            </List>

            <Header4>Spurious Correlations</Header4>
            <List>
                <ListItem>Model learns shortcuts instead of true signal</ListItem>
                <ListItem>Examples:
                    <List nested>
                        <ListItem>Cow = grass background (fails on cow on beach)</ListItem>
                        <ListItem>Hospital = text/equipment (not disease)</ListItem>
                        <ListItem>Skin lesion = ruler in image (artifact correlation)</ListItem>
                    </List>
                </ListItem>
                <ListItem>Often invisible in i.i.d. test sets, exposed in distribution shift</ListItem>
                <ListItem>Detection: subgroup analysis, counterfactual testing</ListItem>
                <ListItem>Mitigation: diverse data, causal reasoning, invariant learning</ListItem>
            </List>

            <Header4>Out-of-Distribution (OOD) Issues</Header4>
            <List>
                <ListItem>CNNs are overconfident on OOD inputs</ListItem>
                <ListItem>May classify random noise with high confidence</ListItem>
                <ListItem>Fails silently — no "I don't know" option</ListItem>
                <ListItem>Types of distribution shift:
                    <List nested>
                        <ListItem><strong>Covariate shift</strong>: input distribution changes</ListItem>
                        <ListItem><strong>Label shift</strong>: class proportions change</ListItem>
                        <ListItem><strong>Concept drift</strong>: relationship changes over time</ListItem>
                    </List>
                </ListItem>
            </List>

            <Header4>OOD Detection Methods</Header4>
            <List>
                <ListItem><strong>Max softmax probability</strong>: low confidence → potential OOD (baseline)</ListItem>
                <ListItem><strong>Temperature scaling</strong>: calibrate confidences first</ListItem>
                <ListItem><strong>Energy-based</strong>: use logit energy instead of softmax</ListItem>
                <ListItem><strong>Mahalanobis distance</strong>: distance in feature space to class centroids</ListItem>
                <ListItem><strong>Ensemble disagreement</strong>: OOD if models disagree</ListItem>
            </List>

            <Header3>Robustness Testing</Header3>

            <Header4>Common Corruptions</Header4>
            <List>
                <ListItem>ImageNet-C: 15 corruption types (noise, blur, weather, digital)</ListItem>
                <ListItem>Test model degradation under realistic corruptions</ListItem>
                <ListItem>Metric: mean Corruption Error (mCE)</ListItem>
            </List>

            <Header4>Adversarial Robustness</Header4>
            <List>
                <ListItem>Small, imperceptible perturbations can fool CNNs</ListItem>
                <ListItem>Types: white-box (model access), black-box (query only)</ListItem>
                <ListItem>Attacks: FGSM, PGD, C&W, AutoAttack</ListItem>
                <ListItem>Defense: adversarial training (expensive), certified defenses</ListItem>
            </List>

            <Header4>Evaluation Checklist</Header4>
            <List>
                <ListItem>☐ Test on natural distribution shifts (new domains, times)</ListItem>
                <ListItem>☐ Check subgroup performance (minority groups, edge cases)</ListItem>
                <ListItem>☐ Run saliency analysis on failure cases</ListItem>
                <ListItem>☐ Test with common corruptions (ImageNet-C style)</ListItem>
                <ListItem>☐ Evaluate calibration (reliability diagrams, ECE)</ListItem>
                <ListItem>☐ Check for spurious correlation via counterfactual testing</ListItem>
            </List>

            <Callout type="tip" title="Interpretability Workflow">
                For debugging and trust-building: 1) Visualize what the model sees (feature maps, Grad-CAM). 2) Test on diverse subgroups and edge cases. 3) Look for shortcuts via attribution methods. 4) Quantify robustness to corruptions and shifts.
            </Callout>
        </Section>
    );
};

export default InterpretabilityAnalysis;
