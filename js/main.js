/**
 * Portfolio Website - Main JavaScript
 * Handles dynamic content, animations, and interactivity
 */

document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Initialize mobile navigation
    initMobileNav();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize back to top button
    initBackToTop();

    // Load dynamic content
    loadProjects();
    loadSkills();

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const nav = document.getElementById('primary-navigation');
                const toggle = document.querySelector('.mobile-nav-toggle');
                if (nav && nav.getAttribute('data-visible') === 'true') {
                    nav.setAttribute('data-visible', 'false');
                    toggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
        });
    });
});

/**
 * Initialize mobile navigation
 */
function initMobileNav() {
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.getElementById('primary-navigation');

    if (!navToggle || !nav) return;

    navToggle.addEventListener('click', () => {
        const isVisible = nav.getAttribute('data-visible') === 'true';
        nav.setAttribute('data-visible', !isVisible);
        navToggle.setAttribute('aria-expanded', !isVisible);
        document.body.style.overflow = !isVisible ? 'hidden' : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInsideNav = nav.contains(e.target) || navToggle.contains(e.target);
        if (!isClickInsideNav && nav.getAttribute('data-visible') === 'true') {
            nav.setAttribute('data-visible', 'false');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections with the 'fade-in' class
    document.querySelectorAll('section, .fade-in').forEach(section => {
        observer.observe(section);
    });

    // Update active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Load and display projects
 */
function loadProjects() {
    const featuredProjects = [
        {
            title: 'AI Showcase – Municipality of Razgrad Chatbot',
            description: 'An AI-powered chatbot for the Municipality of Razgrad that helps citizens find information about municipal services, submit requests, and get answers to frequently asked questions.',
            image: 'images/projects/razgrad-chatbot.jpg',
            tags: ['AI', 'Chatbot', 'Python', 'OpenAI', 'Django'],
            demo: 'https://municipality-razgrad.craftgenie.ai/',
            code: '#'
        },
        {
            title: 'Almost Famous Website',
            description: 'A modern, responsive website for Almost Famous, featuring a clean design, smooth animations, and easy navigation to showcase their services and portfolio.',
            image: 'images/projects/almost-famous.jpg',
            tags: ['Web Design', 'HTML/CSS', 'JavaScript', 'Responsive'],
            demo: 'https://www.almostfamous.bg/',
            code: '#'
        },
        {
            title: 'Stoyanov Guitars Website',
            description: 'An elegant website for Stoyanov Guitars, featuring a gallery of handcrafted instruments, artist endorsements, and an online inquiry system for custom orders.',
            image: 'images/projects/stoyanov-guitars.jpg',
            tags: ['Web Development', 'E-commerce', 'UI/UX', 'JavaScript'],
            demo: 'https://www.stoyanov-guitars.bg/',
            code: '#'
        }
    ];

    const moreProjects = [
        {
            title: 'Full-Stack Starter Kit',
            description: 'A comprehensive starter kit for full-stack development with modern technologies and best practices.',
            tags: ['Node.js', 'PhP', 'MySQL', 'Docker'],
            demo: 'https://github.com/PeterStoyanov83/full-stack-starter-kit',
            code: 'https://github.com/PeterStoyanov83/full-stack-starter-kit'
        },
        {
            title: 'Project K – Django Diploma Project',
            description: 'A full-featured web application built with Django for educational purposes.',
            tags: ['Django', 'Python', 'PostgreSQL', 'Bootstrap'],
            demo: 'https://github.com/PeterStoyanov83/Django_Project_K_Web_Exam',
            code: 'https://github.com/PeterStoyanov83/Django_Project_K_Web_Exam'
        },
        {
            title: 'Peter Stoyanov Coaching',
            description: 'Professional coaching services to help individuals improve their communication and leadership skills.',
            tags: ['Web Development', 'Automation', 'Sendgrid', 'SEO'],
            demo: 'https://peter-stoyanov.com',
            code: '#'
        }
    ];

    const projectsGrid = document.querySelector('.projects-grid');
    const moreProjectsGrid = document.querySelector('.more-projects');

    if (projectsGrid) {
        featuredProjects.forEach(project => {
            const projectCard = createProjectCard(project, true);
            projectsGrid.appendChild(projectCard);
        });
    }

    if (moreProjectsGrid) {
        moreProjects.forEach(project => {
            const projectCard = createProjectCard(project, false);
            moreProjectsGrid.appendChild(projectCard);
        });
    }
}

/**
 * Create a project card element
 */
function createProjectCard(project, isFeatured = true) {
    if (isFeatured) {
        const card = document.createElement('div');
        card.className = 'project-card fade-in';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    ${project.code !== '#' ? `
                    <a href="${project.code}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                        <i class="fab fa-github"></i> Code
                    </a>` : ''}
                </div>
            </div>
        `;
        return card;
    } else {
        const card = document.createElement('a');
        card.href = project.demo;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        card.className = 'small-project-card fade-in';
        card.innerHTML = `
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
            </div>
        `;
        return card;
    }
}

/**
 * Load and display skills
 */
function loadSkills() {
    const skills = [
        {name: 'Python', icon: 'fab fa-python', level: 90},
        {name: 'JavaScript', icon: 'fab fa-js', level: 85},
        {name: 'Django', icon: 'fas fa-server', level: 88},
        {name: 'Next.js', icon: 'fas fa-code', level: 80},
        {name: 'React', icon: 'fab fa-react', level: 82},
        {name: 'Node.js', icon: 'fab fa-node-js', level: 78},
        {name: 'HTML5', icon: 'fab fa-html5', level: 95},
        {name: 'CSS3', icon: 'fab fa-css3-alt', level: 90},
        {name: 'TailwindCSS', icon: 'fas fa-paint-brush', level: 85},
        {name: 'PostgreSQL', icon: 'fas fa-database', level: 83},
        {name: 'Docker', icon: 'fab fa-docker', level: 80},
        {name: 'Git', icon: 'fab fa-git-alt', level: 88},
        {name: 'Jenkins', icon: 'fas fa-code-branch', level: 75},
        {name: 'GitHub Actions', icon: 'fab fa-github', level: 78},
        {name: 'AWS', icon: 'fab fa-aws', level: 70},
        {name: 'AI/ML', icon: 'fas fa-brain', level: 82},
        {name: 'OpenAI', icon: 'fas fa-robot', level: 85},
        {name: 'LangChain', icon: 'fas fa-link', level: 80}
    ];

    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;

    skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card fade-in';
        skillCard.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <h3 class="skill-name">${skill.name}</h3>
            <div class="skill-level">
                <div class="skill-level-bar" style="width: ${skill.level}%"></div>
            </div>
        `;
        skillsGrid.appendChild(skillCard);
    });
}

// Add a simple animation for skill bars when they come into view
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-level-bar');
            skillBars.forEach(bar => {
                bar.style.width = bar.style.width; // Trigger animation
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, {threshold: 0.5});

// Observe skills section
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}
