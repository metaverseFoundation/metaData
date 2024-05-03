const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function processProjectData(urls) {
    for (const url of urls) {
        try {
            let projectName = getProjectName(url)
            const response = await axios.get(url);
            const directoryPath = path.join(__dirname, projectName);

            // 创建 EtherPulse 目录
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath);
            }

            // 下载 logo 并保存到 EtherPulse 目录
            const logoResponse = await axios.get(response.data.logo, { responseType: 'stream' });
            const writer = fs.createWriteStream(path.join(directoryPath, 'logo.png'));
            logoResponse.data.pipe(writer);
            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });

            // 生成 metadata 文件
            const metadata = {
                ...response.data,
                logo: 'https://raw.githubusercontent.com/metaverseFoundation/metaData/main/'+projectName+'/logo.png'
            };
            fs.writeFileSync(path.join(directoryPath, 'metadata.json'), JSON.stringify(metadata, null, 2));

            // 打印 metadata 文件的链接
            console.log('https://raw.githubusercontent.com/metaverseFoundation/metaData/main/'+projectName+'/metadata.json');
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

function getProjectName(url) {
    const pathParts = url.split('/');
    const fileName = pathParts[pathParts.length - 1];
    const fileNameParts = fileName.split('.');
    return fileNameParts[0]
}


const urls = ["https://ytss.s3.ap-southeast-1.amazonaws.com/EtherPulse.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/QuantumStake.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/CryptoGuardian.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/NebulaNode.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/OrbitalTrust.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/ZenithPeak.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/AuroraVault.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/StellarForge.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/CosmicAnchor.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/EtherNavigator.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/BlockchainVoyager.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/DeFiCrusader.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/SigmaStakers.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/ZenonNetwork.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/QuantumBeacon.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/MythosMine.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/NovaSphere.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/EtherPhoenix.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/CryptoCatalyst.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/HelixHarbor.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/PegasusPoint.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/ZephyrZen.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/ValhallaVision.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/OmegaOrbit.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/LunarLattice.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/PolarisPulse.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/TerraTrust.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/EtherealElement.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/HyperionHaven.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/MeridianMesh.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/AetherArch.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/CelestialChain.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/GenesisGuard.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/InfinityInlay.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/JovianJewel.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/KryptonKey.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/LegacyLink.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/MysticMesh.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/NebulaNest.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/OrionOasis.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/PrismPillar.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/QuantumQuarry.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/RadiantRidge.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/StellarSentry.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/TectonicTrust.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/UltravioletUnion.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/VertexVault.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/WyvernWings.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/XanaduXylem.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/YggdrasilYield.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/ZephyrZone.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/AlphaAeon.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/BetaBurst.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/GammaGuardian.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/DeltaDawn.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/EpsilonEcho.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/ZetaZenith.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/EtaElement.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/ThetaThrone.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/IotaIsland.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/KappaKeystone.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/LambdaLantern.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/MuMeadow.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/NuNucleus.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/XiXenon.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/OmicronOrchard.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/PiPinnacle.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/RhoReef.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/SigmaSanctuary.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/TauTerra.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/UpsilonUtopia.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/PhiFountain.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/ChiChroma.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/PsiPortal.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/OmegaOath.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/AmberAegis.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/BerylBastion.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/CitrineCrest.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/DiamondDomain.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/EmeraldEmpire.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/FossilFable.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/GarnetGrove.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/HeliodorHalo.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/IoliteIsle.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/JadeJunction.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/KunziteKingdom.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/LapisLagoon.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/MoonstoneMystic.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/NephriteNebula.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/ObsidianOrbit.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/PeridotPalisade.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/QuartzQuintessence.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/RubyRidge.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/SapphireShore.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/TopazTurret.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/UnakiteUmbra.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/VarisciteVale.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/WatermelonWonder.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/XyloXanadu.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/ZirconZephyr.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/AcaciaArc.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/BirchBridges.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/CedarCrown.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/DogwoodDomain.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/EbonyEcho.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/FirFrontier.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/GinkgoGuard.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/HawthornHaven.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/IronwoodInsignia.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/JuniperJewel.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/KoaKingdom.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/LindenLegacy.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/MapleMeadow.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/NutmegNexus.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/OakOasis.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/PinePillar.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/QuinceQuarry.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/RedwoodRealm.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/SequoiaSanctuary.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/TeakTemple.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/UlmusUtopia.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/VineVanguard.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/WillowWave.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/XylemXenon.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/YuccaYield.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/ZelkovaZenith.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/ArcaneAltar.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/BeaconBlaze.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/CitadelCrest.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/DominionDawn.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/EnclaveEcho.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/FortressFlame.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/GarrisonGem.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/HavenHarbor.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/IsleInfluence.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/JunctionJupiter.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/KeepKeystone.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/LighthouseLumen.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/ManorMystic.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/NexusNebula.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/OutpostOrion.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/PalacePinnacle.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/QuartersQuintessence.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/RetreatRadiance.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/SanctuarySigma.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/TowerTau.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/UtopiaUpsilon.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/VaultVega.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/WardWyvern.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/XenithXolotl.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/YardYggdrasil.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/ZenZone.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/AstraApex.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/BorealBastion.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/CelestiaCrown.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/DriftwoodDomain.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/EchoElysium.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/FlareFable.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/GladeGuard.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/HearthHarbor.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/IrisIsle.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/JovialJunction.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/KineticKingdom.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/LotusLantern.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/MirageMeadow.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/NimbusNexus.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/OpalOasis.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/PulsarPillar.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/QuasarQuarry.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/RadianceRidge.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/StarlightSanctuary.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/TideTemple.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/UmbraUnion.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/VortexVale.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/WhirlwindWave.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/XenonXanadu.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/YellowstoneYield.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/ZephyrZenith.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/AeroArc.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/BioBridges.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/CyberCedar.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/DynamoDomain.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/ElectroEcho.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/FluxFrontier.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/GeoGuard.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/HydroHaven.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/InfraInsignia.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/JoltJewel.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/KineticKeep.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/LuminLighthouse.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/MagneticManor.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/NanoNexus.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/OmniOak.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/PhotonPillar.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/QuantumQuarters.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/RadiantRetreat.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/SolarSanctuary.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/TerraTower.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/UltraUtopia.json",
    "https://ytss.s3.ap-southeast-1.amazonaws.com/VoltVault.json"];
processProjectData(urls);