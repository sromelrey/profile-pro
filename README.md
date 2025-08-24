# Resume Builder

A modern, responsive resume builder built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI components. Create professional resumes with a hybrid editor that includes both form-based editing and HTML code viewing.

## Features

### ✨ Core Features
- **Hybrid Editor**: Form-based editor for easy data entry + HTML code viewer for developers
- **Live Preview**: Real-time preview of your resume as you edit
- **PDF Export**: Export your resume as a high-quality PDF
- **Print Support**: Print your resume directly from the browser
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface built with Tailwind CSS

### 📝 Resume Sections
- **Contact Information**: Name, email, phone, location, social links
- **Professional Summary**: Compelling introduction about your background
- **Work Experience**: Detailed job history with achievements
- **Education**: Academic background and qualifications
- **Skills**: Technical and soft skills with proficiency levels
- **Projects**: Portfolio projects with descriptions and links

### 🎨 Design Features
- **Professional Template**: Clean, modern resume design
- **Color-coded Sections**: Visual organization with color-coded borders
- **Typography**: Optimized fonts and spacing for readability
- **Print-friendly**: Optimized layout for both screen and print

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **PDF Generation**: html2canvas + jsPDF
- **Development**: ESLint, PostCSS

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd profile-pro
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Usage

### Form Editor
1. Use the **Form Editor** tab to fill in your resume information
2. Navigate between sections using the tabbed interface:
   - **Contact**: Personal information and social links
   - **Summary**: Professional summary and introduction
   - **Experience**: Work history with achievements
   - **Education**: Academic background
   - **Skills**: Technical and soft skills
   - **Projects**: Portfolio projects

### Code Editor
1. Switch to the **Code Editor** tab to view the generated HTML
2. The HTML code is automatically generated from your form data
3. Copy the code for custom implementations or external use

### Export Options
- **Print**: Click the "Print" button to print your resume
- **PDF Export**: Click "Export PDF" to download as a PDF file

## Project Structure

```
profile-pro/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ResumeBuilder.tsx  # Main resume builder component
│   ├── ResumeForm.tsx     # Form-based editor
│   ├── CodeEditor.tsx     # HTML code viewer
│   └── resume-templates/  # Resume template components
│       └── DefaultTemplate.tsx
├── lib/                   # Utility functions
│   ├── utils.ts           # Common utilities
│   └── pdf-export.ts      # PDF export functionality
├── types/                 # TypeScript type definitions
│   └── resume.ts          # Resume data types
└── public/                # Static assets
```

## Customization

### Adding New Templates
1. Create a new template component in `components/resume-templates/`
2. Follow the `DefaultTemplate.tsx` structure
3. Export the component and add it to the template registry

### Styling
- Modify Tailwind classes in template components
- Update global styles in `app/globals.css`
- Customize color scheme and typography

### Data Structure
- Resume data is typed with TypeScript interfaces
- Modify `types/resume.ts` to add new fields
- Update form components to handle new data

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
