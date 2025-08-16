# Client Onboarding Form 

This project is a client onboarding form built with **Next.js 15**, **React Hook Form**, **Zod validation**, **Tailwind CSS**, and **Framer Motion**.  
The form collects client details (name, email, company, services, budget, project start date, terms agreement) and submits to a configurable API endpoint (`NEXT_PUBLIC_ONBOARD_URL`).  

---



## Repo URL : https://github.com/randima-dilshani/Clients-Onboarding-Form.git

---

## Deployment
- Works locally with `.env.local`  
- Example environment variable:  

---

## Choices Made
- **Next.js 15** for modern app directory and routing.  
- **Tailwind CSS v3** for styling simplicity.  
- **React Hook Form + Zod** for type-safe form validation.  
- **Framer Motion** for subtle animations.  
- Used a Beeceptor mock API (`https://clientonboarding.free.beeceptor.com`) to bypass CORS issues.  


---

## Known Gaps
- `https://example.com/api/onboard` (assignment API) blocks CORS → replaced with mock API for testing.  
