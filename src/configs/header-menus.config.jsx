import ImgDeepSparseEngine from '../images/nav-icondeepsparse-engine.svg';
import ImgSparseML from '../images/nav-iconsparse-ml.svg';
import ImgSparseZoo from '../images/nav-iconsparse-zoo.svg';
import ImgNLP from '../images/nav-iconnlp.svg';
import ImgCV from '../images/nav-iconcomputer-vision.svg';
import ImgSlack from '../images/nav-iconslack.svg';
import ImgCode from '../images/nav-iconcode.svg';
import ImgDocs from '../images/nav-icondocs.svg';
import ImgLabs from '../images/nav-iconlabs.png';
import ImgBlog from '../images/nav-iconblog.svg';
import ImgResearch from '../images/nav-iconresearch.svg';
import ImgEvents from '../images/nav-iconevents.svg';
import ImgVideos from '../images/nav-iconvideos.svg';
import ImgTech from '../images/nav-icontech.svg';
import ImgNewsletter from '../images/nav-iconnewsletter.svg';
import ImgTeam from '../images/nav-iconteam.svg';
import ImgCareers from '../images/nav-iconcareers.svg';
import ImgContact from '../images/nav-iconcontact.svg';
import ImgLegal from '../images/nav-iconlegal.svg';


const HeaderMenusConfig = {
  'items': [
    {
      title: 'Products',
      link: false,
      subItems: [
        {
          title: 'DeepSparse Engine',
          desc: 'Sparsity-aware neural network inference engine for GPU-class performance on CPUs.',
          img: ImgDeepSparseEngine,
          link: 'https://neuralmagic.com/deepsparse-engine',
        },
        {
          title: 'SparseML',
          desc: 'Open-source libraries for applying sparsification recipes to neural networks with a few lines of code.',
          img: ImgSparseML,
          link: 'https://neuralmagic.com/sparseml',
        },
        {
          title: 'SparseZoo',
          desc: 'Open-source model repository for sparse and sparse-quantized models.',
          img: ImgSparseZoo,
          link: 'https://sparsezoo.neuralmagic.com/',
        },
      ]
    },
    {
      title: 'Use Cases',
      link: false,
      subItems: [
        {
          title: 'Natural Language Processing (NLP)',
          desc: 'Get started with Sparse NLP use cases. Apply your data and redeploy on CPUs with ease.',
          img: ImgNLP,
          link: 'https://neuralmagic.com/use-cases/#nlp',
        },
        {
          title: 'Compute Vision',
          desc: 'Get started with sparse computer vision use cases. Apply your data and deploy on CPUs with ease.',
          img: ImgCV,
          link: 'https://neuralmagic.com/use-cases/#computervision',
        },
      ]
    },
    {
      title: 'Community',
      link: false,
      subItems: [
        {
          title: 'Deep Sparse Slack Community',
          desc: 'Engage, discuss, and get direct access to our engineering teams.',
          img: ImgSlack,
          link: 'https://join.slack.com/t/discuss-neuralmagic/shared_invite/zt-q1a1cnvo-YBoICSIw3L1dmQpjBeDurQ',
        },
        {
          title: 'Code',
          desc: 'Explore our code on GitHub.',
          img: ImgCode,
          link: 'https://github.com/neuralmagic',
        },
        {
          title: 'Docs',
          desc: 'Get support or get started.',
          img: ImgDocs,
          link: 'https://docs.neuralmagic.com/',
        },
      ]
    },
    {
      title: 'Labs',
      link: false,
      subItems: [
        {
          title: 'Labs by Neural Magic',
          desc: 'Partner with experts to ensure your ML training and deployment pipelines are optimized with SOTA research and industry best practices.',
          img: ImgLabs,
          link: 'https://neuralmagic.com/labs',
        },
      ]
    },
    {
      title: 'Resources',
      link: false,
      subItems: [
          {
          title: 'Support',
          desc: 'Learn about various Support channels.',
          img: ImgLabs,
          link: 'https://neuralmagic.com/support',
        },
        {
          title: 'Blogs & News',
          desc: 'Stay current & discover SOTA performance techniques.',
          img: ImgBlog,
          link: 'https://neuralmagic.com/blog',
        },
        {
          title: 'Research Papers',
          desc: 'Explore our published research papers that are driving ML simplicity & performance.',
          img: ImgResearch,
          link: 'https://neuralmagic.com/resources/technical-papers/',
        },
        {
          title: 'Upcoming Events',
          desc: 'Explore upcoming events Neural Magic will be attending. Come say hello!',
          img: ImgEvents,
          link: 'https://neuralmagic.com/neural-magic-events/',
        },
        {
          title: 'On-Demand Videos',
          desc: 'Listen to on-demand ML performance content on your time.',
          img: ImgVideos,
          link: 'https://neuralmagic.com/resources/on-demand-webinars/',
        },
        {
          title: 'Our Technology',
          desc: 'Learn about the "magic" behind Neural Magic!',
          img: ImgTech,
          link: 'https://neuralmagic.wpengine.com/technology',
        },
        {
          title: 'Subscribe',
          desc: 'Sign up for the regular Neural Magic email updates.',
          img: ImgNewsletter,
          link: 'https://neuralmagic.wpengine.com/deep-sparse-community/#subscribe',
        },
      ]
    },
    {
      title: 'Company',
      link: false,
      subItems: [
        {
          title: 'Team & Investors',
          desc: 'Explore our team and our investors.',
          img: ImgTeam,
          link: 'https://neuralmagic.com/about',
        },
        {
          title: 'Careers',
          desc: 'Discover open positions. Apply or refer a friend.',
          img: ImgCareers,
          link: 'https://neuralmagic.com/careers',
        },
        {
          title: 'Contact',
          desc: 'Reach out to us directly.',
          img: ImgContact,
          link: 'https://neuralmagic.com/contact',
        },
        {
          title: 'Legal',
          desc: 'View Neural Magic\'s legal documentation.',
          img: ImgLegal,
          link: 'https://neuralmagic.com/legal',
        },
      ]
    },
  ]
};

export default HeaderMenusConfig;
