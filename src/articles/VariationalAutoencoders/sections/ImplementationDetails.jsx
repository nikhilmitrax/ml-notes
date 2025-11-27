import React from 'react';
import { Brain } from 'lucide-react';
import Section from '../../../components/Section';
import CodeBlock from '../../../components/CodeBlock';

const ImplementationDetails = () => {
    return (
        <Section title="Implementation Details" icon={Brain}>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Here is how a typical VAE is implemented in PyTorch. Notice the split into <code>fc21</code> (mean) and <code>fc22</code> (log variance) in the encoder.
            </p>
            <CodeBlock code={`class VAE(nn.Module):
    def __init__(self, input_dim=784, hidden_dim=400, latent_dim=20):
        super(VAE, self).__init__()
        # Encoder
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.fc21 = nn.Linear(hidden_dim, latent_dim) # Mean
        self.fc22 = nn.Linear(hidden_dim, latent_dim) # Log Variance

        # Decoder
        self.fc3 = nn.Linear(latent_dim, hidden_dim)
        self.fc4 = nn.Linear(hidden_dim, input_dim)

    def encode(self, x):
        h1 = F.relu(self.fc1(x))
        return self.fc21(h1), self.fc22(h1)

    def reparameterize(self, mu, logvar):
        std = torch.exp(0.5*logvar)
        eps = torch.randn_like(std)
        return mu + eps*std

    def decode(self, z):
        h3 = F.relu(self.fc3(z))
        return torch.sigmoid(self.fc4(h3))

    def forward(self, x):
        mu, logvar = self.encode(x.view(-1, 784))
        z = self.reparameterize(mu, logvar)
        return self.decode(z), mu, logvar`} />

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-2">The Loss Function</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                The loss function is the sum of the reconstruction loss (Binary Cross Entropy) and the KL Divergence regularization term.
            </p>
            <CodeBlock code={`def loss_function(recon_x, x, mu, logvar):
    # Reconstruction loss (Binary Cross Entropy for MNIST)
    # reduction='sum' sums over the batch
    BCE = F.binary_cross_entropy(recon_x, x.view(-1, 784), reduction='sum')

    # KL Divergence
    # 0.5 * sum(1 + log(sigma^2) - mu^2 - sigma^2)
    KLD = -0.5 * torch.sum(1 + logvar - mu.pow(2) - logvar.exp())

    return BCE + KLD`} />

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-2">Training Loop</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                The training loop is standard, but we need to handle the multiple outputs from the model (reconstruction, mean, and log variance) to compute the loss.
            </p>
            <CodeBlock code={`optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

def train(epoch):
    model.train()
    train_loss = 0
    for batch_idx, (data, _) in enumerate(train_loader):
        optimizer.zero_grad()
        
        # Forward pass
        recon_batch, mu, logvar = model(data)
        
        # Calculate loss
        loss = loss_function(recon_batch, data, mu, logvar)
        
        # Backward pass and optimize
        loss.backward()
        train_loss += loss.item()
        optimizer.step()
        
    print(f'Epoch: {epoch} Average loss: {train_loss / len(train_loader.dataset):.4f}')`} />
        </Section>
    );
};

export default ImplementationDetails;
