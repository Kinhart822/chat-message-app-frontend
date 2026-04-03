# Project Structure

This React project follows a structured architecture to ensure maintainability and scalability.

## Directory Structure

- \`src/\`
  - \`apis/\` # Dùng để khởi tạo các api function
  - \`assets/\` # Chứa các file tài nguyên (images, fonts, icons, etc.)
  - \`components/\` # Chứa các components (reusable components)
  - \`constants/\` # Chứa các file constant
  - \`hooks/\` # Chứa hook custom
  - \`layouts/\` # Chứa các layout component
  - \`lib/\` # Chứa các file config của thư viện bên ngoài
  - \`pages/\` # Chứa các trang của dự án
  - \`providers/\` # Chứa các providers (theme, store, etc.)
  - \`routes/\` # Định nghĩa các root file, routing
  - \`schemas/\` # Chứa các schemas validate (zod, yup, ...)
  - \`stores/\` # Quản lý state (Redux, Zustand, MobX, etc.)
  - \`styles/\` # Quản lý các css global hoặc thư viện scss
  - \`types/\` # Dùng để chứa các file định nghĩa type
  - \`utils/\` # Chứa các hàm dùng chung của dự án
  - \`App.tsx\` # Component Root của toàn bộ App
  - \`main.tsx\` # Entry point của ứng dụng React

## Getting Started

1. Cài đặt dependencies:
   \`\`\`bash
   yarn install
   \`\`\`

2. Khởi chạy dự án (Development Mode):
   \`\`\`bash
   yarn dev
   \`\`\`

3. Build cho Production:
   \`\`\`bash
   yarn build
   \`\`\`
