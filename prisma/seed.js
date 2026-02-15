const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SEED_JOBS = [
    {
        title: 'Senior React Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salaryMin: 120000,
        salaryMax: 180000,
        description: 'We are looking for an experienced React developer to join our growing team. You will work on cutting-edge web applications used by millions.',
        requirements: 'React,TypeScript,Node.js,GraphQL,5+ years experience',
        status: 'active',
        postedBy: 'hr@techcorp.com',
        postedDate: '2026-02-10',
        currency: 'INR',
    },
    {
        title: 'UX/UI Designer',
        company: 'DesignHub',
        location: 'New York, NY',
        type: 'Full-time',
        salaryMin: 90000,
        salaryMax: 140000,
        currency: 'USD',
        description: 'Join our creative team to design beautiful and intuitive user experiences for our enterprise clients.',
        requirements: 'Figma,Adobe XD,User Research,Prototyping,3+ years experience',
        status: 'active',
        postedBy: 'hiring@designhub.com',
        postedDate: '2026-02-09',
    },
    {
        title: 'DevOps Engineer',
        company: 'CloudScale',
        location: 'Austin, TX',
        type: 'Remote',
        salaryMin: 130000,
        salaryMax: 170000,
        currency: 'USD',
        description: 'Manage and optimize our cloud infrastructure. Experience with AWS, Docker, and Kubernetes required.',
        requirements: 'AWS,Docker,Kubernetes,Terraform,CI/CD,Linux',
        status: 'active',
        postedBy: 'jobs@cloudscale.io',
        postedDate: '2026-02-08',
    },
    {
        title: 'Data Scientist',
        company: 'DataMinds',
        location: 'Seattle, WA',
        type: 'Hybrid',
        salaryMin: 140000,
        salaryMax: 200000,
        currency: 'USD',
        description: 'Apply machine learning and statistical analysis to solve complex business problems with large datasets.',
        requirements: 'Python,TensorFlow,SQL,Statistics,Machine Learning',
        status: 'active',
        postedBy: 'careers@dataminds.com',
        postedDate: '2026-02-07',
    },
    {
        title: 'Mobile App Developer',
        company: 'AppWorks',
        location: 'Los Angeles, CA',
        type: 'Full-time',
        salaryMin: 100000,
        salaryMax: 150000,
        currency: 'USD',
        description: 'Build cross-platform mobile applications using React Native for iOS and Android platforms.',
        requirements: 'React Native,JavaScript,iOS,Android,REST APIs',
        status: 'active',
        postedBy: 'hr@appworks.dev',
        postedDate: '2026-02-06',
    },
    {
        title: 'Backend Engineer',
        company: 'ServerPro',
        location: 'Chicago, IL',
        type: 'Full-time',
        salaryMin: 110000,
        salaryMax: 160000,
        currency: 'EUR',
        description: 'Design and implement scalable backend services and APIs for our flagship product.',
        requirements: 'Node.js,Python,PostgreSQL,Redis,Microservices',
        status: 'active',
        postedBy: 'hiring@serverpro.com',
        postedDate: '2026-02-05',
    },
    {
        title: 'Marketing Intern',
        company: 'GrowthLab',
        location: 'Remote',
        type: 'Internship',
        salaryMin: 20000,
        salaryMax: 35000,
        currency: 'GBP',
        description: 'Assist the marketing team with social media campaigns, content creation, and analytics reporting.',
        requirements: 'Social Media,Content Writing,Google Analytics,Canva',
        status: 'active',
        postedBy: 'internships@growthlab.com',
        postedDate: '2026-02-04',
    },
    {
        title: 'Product Manager',
        company: 'InnovateTech',
        location: 'Boston, MA',
        type: 'Full-time',
        salaryMin: 130000,
        salaryMax: 180000,
        currency: 'USD',
        description: 'Lead product strategy and roadmap for our B2B SaaS platform. Work closely with engineering and design teams.',
        requirements: 'Product Strategy,Agile,JIRA,Data Analysis,B2B SaaS',
        status: 'active',
        postedBy: 'pm@innovatetech.com',
        postedDate: '2026-02-03',
    },
    {
        title: 'Full Stack Developer',
        company: 'WebFlow Studios',
        location: 'Denver, CO',
        type: 'Contract',
        salaryMin: 95000,
        salaryMax: 135000,
        currency: 'AED',
        description: 'Build and maintain full-stack web applications using modern JavaScript frameworks and cloud services.',
        requirements: 'Next.js,React,Node.js,MongoDB,AWS',
        status: 'active',
        postedBy: 'dev@webflowstudios.com',
        postedDate: '2026-02-02',
    },
];

async function main() {
    console.log('Seeding database...');

    // Clear existing data
    await prisma.application.deleteMany();
    await prisma.job.deleteMany();

    // Seed jobs
    for (const job of SEED_JOBS) {
        await prisma.job.create({ data: job });
    }

    console.log(`Seeded ${SEED_JOBS.length} jobs.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
