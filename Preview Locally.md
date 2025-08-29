Preview locally
1) Install dependencies
```bash
bun install
```
  
2) Run the dev server
```bash
bun run dev
```
Open http://localhost:3000
4) Explore pages
-Homepage: http://localhost:3000/
-Contact form: http://localhost:3000/contact (submits to /contact/success)
-Case studies index: http://localhost:3000/projects
-Example case study:
  - http://localhost:3000/projects/ecommerce-platform
  - http://localhost:3000/projects/task-management-app
-Blog index: http://localhost:3000/blog
-Example blog posts:
  - http://localhost:3000/blog/improving-core-web-vitals
  - http://localhost:3000/blog/typed-forms-with-react-and-zod
4) Optional: Production build preview
```bash
bun run build
bun run start
```
Open http://localhost:3000
View your Netlify site link and plan
Go to your team: Netlify team projects
Check plan: Team settings → Billing/Plan
Find your live site URL: Sites → select your site → Site details → Primary domain (usually like https://YOUR-SITE-NAME.netlify.app)
Tip
Contact form works out-of-the-box with Netlify Forms once deployed. Test real submissions on the deployed site (Site → Forms).
