import React from 'react';
import './recovery.css'; // Import the CSS file for styles
import wallet from '../../assets/wallet.png'; // Import an image for the section
import { FaAccessibleIcon, FaBitcoin, FaEthereum, FaGoogleWallet, FaKey, FaPuzzlePiece, FaUsb, FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const services = [
    {
        id: 1,
        title: "Recovering Lost or Forgotten Wallet Password",
        description: "If you can’t remember your wallet password, we are here to help. Using the latest technologies, we can decrypt the password.",
        linkText: "Restore Password",
        icon: FaKey
    },
    {
        id: 2,
        title: "Restoring Incomplete & Invalid Seed Phrase",
        description: "Lost a few words from your seed phrase? There’s still hope! If most of your seed phrase is intact, we can often help reconstruct the missing parts.",
        linkText: "Recover Seed Phrase",
        icon: FaAccessibleIcon
    },
    {
        id: 3,
        title: "Regaining Access to Unsupported Crypto Wallet",
        description: "Outdated crypto wallet isn’t working anymore? Don’t panic — our team specializes in regaining access to all types of crypto wallets.",
        linkText: "Restore Your Wallet",
        icon: FaPuzzlePiece
    },
    {
        id: 4,
        title: "Scam Tracing",
        description: "We offer a scam tracing service (not a recovery service). This way, you can build a case to find the real identity of the scammer.",
        linkText: "Request Scam Trace",
        icon: FaKey
    },
];

const CryptoRecoverySection = () => {
     const navigate = useNavigate();
    return (
        <section className="crypto-recovery-section">
            <h1 className="main-title">We Recover All Types of Crypto</h1>
            <div className="content-container">
                <img
                    className="crypto-image"
                    src={wallet}
                    alt="Crypto Wallet"
                    style={{ width: '450px', height: 'auto' }}
                />
                <div id='wallets-section' className="crypto-details">
                    <div className="crypto-item">
                        <FaBitcoin style={{ color: 'orange', fontSize: '50px', marginRight: '10px' }} />
                        <h2>Bitcoin</h2>
                        <p>
                            We utilize a variety of techniques to recover Bitcoin from lost or corrupted wallets, damaged hard drives, forgotten passphrases, and more.
                            We have extensive experience recovering wallets based on the Bitcoin Core architecture, including: Dogecoin (DOGE), Litecoin (LTC), Dash Core (DASH).
                        </p>
                    </div>
                    <div className="crypto-item">
                        <FaEthereum style={{ fontSize: '50px', marginRight: '10px' }} />
                        <h2>Ethereum</h2>
                        <p>
                            The Ethereum blockchain contains thousands of tokens and NFTs. If you need help recovering staked assets, DeFi products, cross chain transactions, invalid seed phrases,
                            beating a sweeper bot, missing assets in different chains, recovering a keystore file, or anything else EVM related, we can help.
                        </p>
                    </div>
                    <div className="crypto-item">
                        <FaWallet style={{ color: 'green', fontSize: '50px', marginRight: '10px' }} />
                        <h2>Software Wallets</h2>
                        <p>
                            We can help with software wallets like MetaMask, Trust Wallet, Coinomi, Coinbase Wallet, MyEtherWallet, and Bitcoin.com Wallet.
                        </p>
                    </div>
                    <div className="crypto-item">
                        <FaUsb style={{ color: 'red', fontSize: '50px', marginRight: '10px' }} />
                        <h2>Hardware Wallets</h2>
                        <p>
                            Hardware wallets are very secure and come in many different designs with common features. If you need help recovering your seed phrase, have missing assets,
                            or any other problem with hardware wallets like Ledger or Trezor, let us know.
                        </p>
                    </div>
                </div>

            </div>
            <div id="recovery-services" className="contaiiner">
                <h1>Our Crypto Recovery Services Include</h1>
                <div className="line"></div>
                <div className="services-grid">
                    {services.map(service => (
                        <div key={service.id} className="service-card">
                            <service.icon style={{ fontSize: '25px', marginBottom: '10px', color: 'black' }} />
                            <h2>{service.title}</h2>
                            <p>{service.description}</p>
                            <br/>
                            <a className="link" onClick={() => navigate('/contact')}>{service.linkText} &gt;</a>
                        </div>
                    ))}
                </div>
                <a href="#" className="learn-more">Learn More About Wallet Recovery</a>
            </div>
        </section>

    );
};

export default CryptoRecoverySection;
