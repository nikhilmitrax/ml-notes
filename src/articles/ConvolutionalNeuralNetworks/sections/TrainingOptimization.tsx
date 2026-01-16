import React from 'react';
import { Settings } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Callout from '../../../components/Callout';
import CodeBlock from '../../../components/CodeBlock';

const TrainingOptimization = () => {
    return (
        <Section title="Training & Optimization" icon={Settings}>
            <Header3>Initialization</Header3>

            <Header4>Why Initialization Matters</Header4>
            <List>
                <ListItem>Poor init → vanishing/exploding gradients from layer 1</ListItem>
                <ListItem>Goal: maintain variance of activations and gradients through layers</ListItem>
                <ListItem>Random init works for shallow nets, fails for deep networks</ListItem>
            </List>

            <Header4>Xavier/Glorot Initialization</Header4>
            <List>
                <ListItem>Designed for: linear/tanh/sigmoid activations</ListItem>
                <ListItem>
                    Variance: <Equation>{`\\text{Var}(W) = \\frac{2}{n_{in} + n_{out}}`}</Equation>
                </ListItem>
                <ListItem>For convs: <Equation>{`n_{in} = C_{in} \\times K^2`}</Equation>, <Equation>{`n_{out} = C_{out} \\times K^2`}</Equation></ListItem>
            </List>

            <Header4>He/Kaiming Initialization</Header4>
            <List>
                <ListItem>Designed for: ReLU activations (accounts for zeroing negative half)</ListItem>
                <ListItem>
                    Variance: <Equation>{`\\text{Var}(W) = \\frac{2}{n_{in}}`}</Equation> (fan-in mode)
                </ListItem>
                <ListItem><strong>Use this for CNNs with ReLU</strong></ListItem>
                <ListItem>PyTorch default for Conv2d with ReLU</ListItem>
            </List>

            <CodeBlock language="python" code={`# He initialization (recommended for ReLU CNNs)
nn.init.kaiming_normal_(conv.weight, mode='fan_out', nonlinearity='relu')

# Xavier initialization (for linear/tanh)
nn.init.xavier_uniform_(conv.weight)

# Zero-init for residual branch final layer (for stability)
nn.init.zeros_(conv.weight)`} />

            <Header3>Optimizers</Header3>

            <Header4>SGD + Momentum</Header4>
            <List>
                <ListItem>Classic choice for CNNs, still competitive</ListItem>
                <ListItem>
                    Update: <Equation>{`v_t = \\mu v_{t-1} + \\nabla L`}</Equation>, <Equation>{`\\theta = \\theta - \\eta v_t`}</Equation>
                </ListItem>
                <ListItem>Typical: <Equation>{`\\mu = 0.9`}</Equation>, learning rate 0.1</ListItem>
                <ListItem>Nesterov momentum often slightly better</ListItem>
                <ListItem>Pros: good generalization, well-understood</ListItem>
                <ListItem>Cons: requires careful LR tuning, schedule design</ListItem>
            </List>

            <Header4>Adam / AdamW</Header4>
            <List>
                <ListItem>Adaptive learning rate per parameter</ListItem>
                <ListItem>Combines momentum (β₁) + RMSprop (β₂)</ListItem>
                <ListItem>Adam: L2 regularization in loss</ListItem>
                <ListItem><strong>AdamW</strong>: decoupled weight decay (better)
                    <Equation block>{`\\theta = \\theta - \\eta(\\hat{m}_t / \\sqrt{\\hat{v}_t} + \\lambda\\theta)`}</Equation>
                </ListItem>
                <ListItem>Typical: <Equation>{`\\beta_1 = 0.9, \\beta_2 = 0.999, \\eta = 0.001`}</Equation></ListItem>
                <ListItem>Pros: less LR sensitivity, faster initial convergence</ListItem>
                <ListItem>Cons: may generalize slightly worse than SGD (with tuning)</ListItem>
            </List>

            <Callout type="tip" title="Adam vs SGD for CNNs">
                SGD+momentum with proper LR schedule often achieves better final accuracy on ImageNet-scale tasks. Adam/AdamW is preferred for faster iteration, smaller datasets, or when LR tuning budget is limited.
            </Callout>

            <Header4>Weight Decay</Header4>
            <List>
                <ListItem>L2 regularization: penalize large weights</ListItem>
                <ListItem>
                    Loss: <Equation>{`\\mathcal{L}_{total} = \\mathcal{L} + \\frac{\\lambda}{2}||W||^2`}</Equation>
                </ListItem>
                <ListItem>Typical values: 1e-4 to 5e-4</ListItem>
                <ListItem><strong>Decoupled weight decay</strong> (AdamW): apply decay directly to weights, not through gradient
                    <List nested>
                        <ListItem>Better for adaptive optimizers</ListItem>
                        <ListItem>More consistent regularization across parameters</ListItem>
                    </List>
                </ListItem>
                <ListItem>Don't apply weight decay to: biases, BatchNorm params (γ, β)</ListItem>
            </List>

            <Header3>Learning Rate Schedules</Header3>

            <Header4>Step Decay</Header4>
            <List>
                <ListItem>Reduce LR by factor (e.g., 0.1) at fixed epochs</ListItem>
                <ListItem>Classic: drop at epoch 30, 60, 90 for 100-epoch training</ListItem>
                <ListItem>Simple, effective, requires knowing total epochs</ListItem>
            </List>

            <Header4>Cosine Annealing</Header4>
            <List>
                <ListItem>Smooth decay following cosine curve
                    <Equation block>{`\\eta_t = \\eta_{min} + \\frac{1}{2}(\\eta_{max} - \\eta_{min})(1 + \\cos(\\frac{t\\pi}{T}))`}</Equation>
                </ListItem>
                <ListItem>No hyperparameter for when to decay</ListItem>
                <ListItem>Popular in modern training (EfficientNet, etc.)</ListItem>
                <ListItem>Can restart (warm restarts) for continued training</ListItem>
            </List>

            <Header4>Linear Warmup</Header4>
            <List>
                <ListItem>Start from small LR, linearly increase to target</ListItem>
                <ListItem>Typical: 5-10 epochs warmup</ListItem>
                <ListItem>Stabilizes early training, especially with large batches</ListItem>
                <ListItem>Critical for: large batch training, pretrained model fine-tuning</ListItem>
            </List>

            <Header4>One-Cycle Policy</Header4>
            <List>
                <ListItem>Warmup to high LR → decay to very low LR</ListItem>
                <ListItem>LR: low → high → very low (single cycle)</ListItem>
                <ListItem>Momentum: inverse pattern (high → low → high)</ListItem>
                <ListItem>Often enables training in fewer epochs</ListItem>
                <ListItem>"Super-convergence" — high LR acts as regularizer</ListItem>
            </List>

            <Header3>Data Augmentation</Header3>

            <Header4>Basic Augmentations</Header4>
            <List>
                <ListItem><strong>Random horizontal flip</strong> — most common, nearly universal</ListItem>
                <ListItem><strong>Random crop</strong> — crop from padded or larger image</ListItem>
                <ListItem><strong>Color jitter</strong> — adjust brightness, contrast, saturation, hue</ListItem>
                <ListItem><strong>Random rotation</strong> — small angles (±15°)</ListItem>
                <ListItem><strong>Random resize/scale</strong> — multi-scale training</ListItem>
            </List>

            <Header4>RandAugment / AutoAugment</Header4>
            <List>
                <ListItem><strong>AutoAugment</strong>: learned augmentation policies via RL/search</ListItem>
                <ListItem><strong>RandAugment</strong>: simplified — N random ops, each with magnitude M
                    <List nested>
                        <ListItem>Just 2 hyperparams: N (number of ops), M (magnitude)</ListItem>
                        <ListItem>Typical: N=2, M=9 for ImageNet</ListItem>
                    </List>
                </ListItem>
                <ListItem><strong>TrivialAugment</strong>: single random op per image, no tuning needed</ListItem>
            </List>

            <Header4>MixUp</Header4>
            <List>
                <ListItem>Convex combination of image pairs and their labels
                    <Equation block>{`\\tilde{x} = \\lambda x_i + (1-\\lambda) x_j, \\quad \\tilde{y} = \\lambda y_i + (1-\\lambda) y_j`}</Equation>
                </ListItem>
                <ListItem><Equation>{`\\lambda \\sim \\text{Beta}(\\alpha, \\alpha)`}</Equation>, typical <Equation>{`\\alpha = 0.2`}</Equation></ListItem>
                <ListItem>Smooths decision boundaries, regularization effect</ListItem>
            </List>

            <Header4>CutMix</Header4>
            <List>
                <ListItem>Cut rectangular region from one image, paste onto another</ListItem>
                <ListItem>Labels mixed proportional to pixel area</ListItem>
                <ListItem>Better than Cutout (uses information from second image)</ListItem>
                <ListItem>Helps with localization — model can't rely on any single region</ListItem>
            </List>

            <CodeBlock language="python" code={`# Typical ImageNet augmentation pipeline
train_transforms = transforms.Compose([
    transforms.RandomResizedCrop(224, scale=(0.08, 1.0)),
    transforms.RandomHorizontalFlip(),
    RandAugment(num_ops=2, magnitude=9),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], 
                        std=[0.229, 0.224, 0.225]),
])

# Test/val: no augmentation, just resize + center crop
val_transforms = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                        std=[0.229, 0.224, 0.225]),
])`} />

            <Header3>Regularization</Header3>
            <List>
                <ListItem><strong>Early stopping</strong>: stop when validation loss stops improving</ListItem>
                <ListItem><strong>Stochastic depth</strong>: randomly drop entire residual blocks during training
                    <List nested>
                        <ListItem>Survival probability decreases linearly with depth</ListItem>
                        <ListItem>Similar effect to dropout but for layers</ListItem>
                        <ListItem>Enables training very deep networks</ListItem>
                    </List>
                </ListItem>
                <ListItem><strong>Dropout</strong>: typically only before final FC layer in modern CNNs</ListItem>
                <ListItem><strong>Augmentation strength</strong>: stronger augmentation = stronger regularization</ListItem>
                <ListItem><strong>Weight decay</strong>: see optimizer section</ListItem>
            </List>

            <Callout type="info" title="Regularization Budget">
                Regularization methods are somewhat substitutable. If using heavy augmentation (MixUp + CutMix + RandAugment), may need less weight decay or dropout. Tune together, not independently.
            </Callout>

            <Header3>Handling Class Imbalance</Header3>
            <List>
                <ListItem><strong>Class reweighting</strong>: weight loss inversely to class frequency
                    <Equation block>{`w_c = \\frac{N}{C \\times n_c}`}</Equation>
                </ListItem>
                <ListItem><strong>Focal loss</strong>: down-weight easy examples, focus on hard ones</ListItem>
                <ListItem><strong>Oversampling</strong>: repeat minority class samples</ListItem>
                <ListItem><strong>Undersampling</strong>: use subset of majority class</ListItem>
                <ListItem><strong>SMOTE</strong>: generate synthetic minority samples (less common for images)</ListItem>
                <ListItem><strong>Class-balanced sampling</strong>: sample batches with equal class representation</ListItem>
            </List>

            <Header4>Two-Stage Training</Header4>
            <List>
                <ListItem>Stage 1: train with normal sampling (learn good features)</ListItem>
                <ListItem>Stage 2: fine-tune with class-balanced sampling or reweighted loss</ListItem>
                <ListItem>Often better than single-stage balanced training</ListItem>
            </List>
        </Section>
    );
};

export default TrainingOptimization;
