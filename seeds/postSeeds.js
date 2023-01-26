const { Post } = require('../models');

const postData = [
	{
		title: 'Understanding Web Accessibility and Its Importance',
		post_content: `Web accessibility refers to the practice of making websites and web applications usable by people with disabilities. It involves designing and developing websites that can be navigated and understood by users with visual, auditory, motor, and cognitive impairments.
			
			Accessible websites ensure that people with disabilities can access the same information and functionality as people without disabilities. This includes providing alternative text for images, using proper headings and labels, and providing clear and concise instructions.
			
			One of the key benefits of accessible web design is that it makes websites more usable for everyone. For example, using proper headings and labels can make it easier for users to navigate and understand a website, regardless of whether they have a disability or not. Additionally, accessible websites are more likely to be compliant with laws and regulations, such as the Americans with Disabilities Act (ADA).
			
			However, despite the importance of web accessibility, many websites are not fully accessible. This is often due to a lack of understanding or resources dedicated to accessible design.
			
			To ensure that your website is accessible, it is important to involve people with disabilities in the design and development process. This can help to identify potential issues and ensure that the website is usable for everyone. Additionally, it is important to use web standards and guidelines, such as the Web Content Accessibility Guidelines (WCAG) to ensure that your website is accessible.
			
			In conclusion, web accessibility is an important issue that ensures that people with disabilities can access the same information and functionality as people without disabilities. It is important to understand the importance of accessible web design and make it a priority when developing websites. By following web standards and guidelines, and involving people with disabilities in the design process, we can create websites that are usable for everyone.`,
		user_id: 1,
	},
	{
		title: 'The Role of Responsive Design in Modern Web Development',
		post_content: `Responsive design is a web development approach that allows websites to adapt to different screen sizes and resolutions. It uses a combination of flexible grids, images, and CSS media queries to create a seamless user experience across different devices.

			The significance of responsive design has grown in recent years as more and more people access the web on different devices such as smartphones and tablets. Without responsive design, a website may not display properly on smaller screens, making it difficult for users to navigate and interact with the content.
			
			Responsive design not only improves the user experience, but it also improves the website's SEO and helps businesses to reach a wider audience. Google has stated that responsive design is one of the best practices for mobile SEO.
			
			In short, responsive design is a crucial aspect of modern web development that ensures a website is usable and visually pleasing across all devices. It improves the user experience, SEO and helps businesses to reach a wider audience. It's a must-have for any website that wants to stay competitive in today's digital landscape.`,
		user_id: 2,
	},
	{
		title: 'Why I Believe Linux is the Best Operating System',
		post_content:
			`Linux is a free and open-source operating system that has been gaining popularity in recent years. As a user and a developer, I strongly believe that Linux is the best operating system for several reasons.

			First, Linux is highly customizable. It allows users to tailor their experience to their specific needs and preferences. This means that users can choose from a wide range of desktop environments, window managers, and even customize the look and feel of their operating system.
			
			Second, Linux is highly secure. It is less susceptible to malware and viruses compared to other operating systems, and it is also less likely to be targeted by hackers. This makes it an ideal choice for businesses and organizations that require a secure operating system.
			
			Third, Linux is highly efficient. It is lightweight and can run on older hardware, which means that users can extend the lifespan of their devices. This makes it an ideal choice for those who want to save money on new hardware.
			
			Fourth, Linux is highly supported by a large community of developers and users. This means that users can find a wide range of software, tutorials, and support for their operating system. This community-driven approach also means that Linux is always evolving and improving.
			
			In conclusion, I believe that Linux is the best operating system for its customizability, security, efficiency and community support. It's a flexible, reliable and efficient choice for both personal and professional use. It's the perfect choice for anyone looking for an operating system that can be tailored to their specific needs and preferences.`,
		user_id: 3,
	},
	{
		title: 'Why I Believe Progressive Web Apps are the Future of Web Development',
		post_content: `Progressive web apps (PWAs) are a relatively new concept in web development that combines the best of both the web and mobile worlds. PWAs are web applications that can be added to a user's home screen, work offline, and even receive push notifications. They also have the ability to look and feel like native mobile apps.

			I believe that PWAs are the future of web development for several reasons.
			First, PWAs offer a better user experience. They are fast, responsive, and work offline, which means users can access the content even when they don't have an internet connection. This feature is particularly useful for areas with poor internet connectivity or for users who are on the go.

			Second, PWAs are more cost-effective for businesses. Developing a PWA is significantly cheaper than developing a native mobile app, as it only requires one codebase instead of separate codebases for different platforms. This means that businesses can reach a wider audience with less investment.

			Lastly, PWAs are more accessible. They are built with web standards, which means that they are accessible to a wider range of users, including users with disabilities. This also makes it easier for developers to ensure that the app is compliant with laws and regulations.

			In conclusion, I believe that PWAs are the future of web development. They offer a better user experience, are more cost-effective for businesses, are more discoverable, and are more accessible. As more and more businesses and developers adopt PWAs, I expect to see them become the norm in the coming years.`,
		user_id: 4,
	},
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
