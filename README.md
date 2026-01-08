# Article Challenge - Nuxt 3 Application

A modern, responsive article browsing application built with Nuxt 3, featuring server-side rendering, TypeScript, and a clean component architecture.

## 🚀 Project Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
├── components/
│   ├── common/          # Business logic components
│   │   ├── ArticleCard.vue    # Individual article display
│   │   ├── ArticleList.vue    # Articles grid/list container
│   │   └── HeaderBar.vue      # Navigation with search/view toggle
│   └── ui/              # Pure UI components
│       ├── LoadingSpinner.vue
│       ├── ErrorMessage.vue
│       └── EmptyState.vue
├── composables/
│   ├── useAPI.ts        # Centralized API communication
│   └── useArticles.ts   # Articles feature logic
├── models/
│   ├── api/             # Raw API response types
│   └── domain/          # UI-optimized data models
├── pages/
│   ├── index.vue        # Articles listing page
│   └── article-[id].vue # Article detail page
├── stores/
│   └── articles.ts      # Pinia store for state management
├── types/
│   └── index.ts         # Shared enums and types
└── utils/
    └── index.ts         # Pure utility functions
```

## 🔧 API & Composables Strategy

### API Layer (`useAPI.ts`)
- **Centralized**: All API calls go through a single composable
- **Error Handling**: Consistent error transformation and user-friendly messages
- **Type Safety**: Strict typing for all API responses
- **SSR Compatible**: Uses Nuxt's `$fetch` for optimal server-side rendering

### Composables Pattern
- **useAPI**: Low-level API communication
- **useArticles**: High-level articles feature logic
- **Separation of Concerns**: Business logic separated from UI components

### State Management
- **Pinia Store**: Global state for articles with reactive getters
- **Local State**: Component-specific state using Vue 3 Composition API
- **Caching**: Articles loaded once and cached for performance

## 📝 Typing & Modeling Decisions

### Type Architecture
```typescript
// API Models - Raw server responses
interface ApiArticle {
  id: string
  title: string
  // ... raw API fields
}

// Domain Models - UI-optimized
interface Article {
  id: string
  title: string
  formattedDate: string  // Pre-formatted for display
  // ... UI-friendly fields
}
```

### Key Decisions
- **Strict TypeScript**: No `any` types throughout the application
- **Model Transformation**: API responses transformed to UI-friendly domain models
- **Enum Usage**: LoadingState enum for consistent state management
- **Interface Segregation**: Separate interfaces for different concerns

## 🛡️ Error Handling Approach

### Multi-Layer Strategy
1. **API Level**: Catch network/server errors, transform to user messages
2. **Store Level**: Handle business logic errors, update error state
3. **Component Level**: Display appropriate error UI with fallback states
4. **Global**: Prevent app crashes with graceful degradation

### Error States
- **Loading States**: Skeleton loaders and spinners
- **Empty States**: User-friendly messages when no data
- **Error States**: Clear error messages with retry options
- **Offline Handling**: Network status monitoring

## 🎯 Key Features Implemented

- ✅ **Responsive Design**: Mobile-first with grid/list view modes
- ✅ **Search Functionality**: Real-time filtering across title, content, author
- ✅ **View Modes**: Grid (multiple columns) and List (single column) layouts
- ✅ **SSR Optimized**: Server-side rendering for better SEO and performance
- ✅ **Type Safety**: Full TypeScript coverage with strict typing
- ✅ **Error Boundaries**: Comprehensive error handling at all levels
- ✅ **Loading States**: Skeleton loaders and loading indicators
- ✅ **Image Optimization**: Proper aspect ratios and fallback handling

## 🔍 Assumptions Made

1. **API Structure**: Mock API returns array of article objects with standard fields
2. **Image Handling**: External image URLs with fallback for broken/missing images
3. **Date Format**: ISO date strings from API, formatted for display
4. **Search Scope**: Search across title, excerpt, author, and category fields
5. **Pagination**: Implemented client-side pagination for demo purposes
6. **Browser Support**: Modern browsers with ES6+ support

## 🚧 What I Would Improve With More Time

### Performance Optimizations
- **Virtual Scrolling**: For large article lists
- **Image Lazy Loading**: Intersection Observer for better performance
- **Bundle Splitting**: Code splitting for better initial load times
- **Caching Strategy**: Implement proper cache invalidation
- **Server-Side Pagination**: Move pagination logic to backend for better performance
- **Server-Side Search**: Implement backend search with indexing for faster results

### User Experience
- **Advanced Search**: Filters by category, date range, author
- **Bookmarking**: Save favorite articles locally
- **Reading Progress**: Track reading position
- **Multiple Themes**: Light, dark, and custom theme support with system preference detection
- **Offline Support**: Service worker for offline reading
- **Social Sharing**: Share articles on social platforms
- **Comments System**: User engagement through comments
- **Related Articles**: AI-powered article recommendations
- **Reading Time Estimation**: Calculate and display estimated reading time

### Technical Improvements
- **Component Library**: Integrate established UI library (Headless UI, Radix Vue, or PrimeVue)
- **FontAwesome Icons**: Replace custom SVGs with FontAwesome for consistency
- **Environment Variables**: Proper env config for different API endpoints and keys
- **Typography System**: Consistent typography scale across all screen sizes
- **Testing Suite**: Unit tests for composables, component tests, E2E tests
- **Accessibility**: Enhanced ARIA labels, keyboard navigation, screen reader support
- **SEO Enhancement**: Meta tags, Open Graph, structured data
- **Performance Monitoring**: Core Web Vitals tracking
- **Error Tracking**: Integration with error monitoring service (Sentry)
- **Analytics Integration**: User behavior tracking and insights
- **Content Management**: Admin panel for content creators
- **Image Optimization**: WebP/AVIF format support with fallbacks

### Architecture Enhancements
- **Micro-frontends**: Scalable architecture for larger teams
- **API Versioning**: Handle multiple API versions gracefully
- **Internationalization**: Multi-language support with locale-based routing
- **Advanced State Management**: Optimistic updates, background sync
- **Database Integration**: PostgreSQL/MongoDB for robust data storage
- **Authentication System**: User accounts, profiles, and personalization
- **Content Delivery Network**: Global content distribution
- **Progressive Web App**: Native app-like experience
- **Real-time Features**: Live notifications and updates
- **Email Subscriptions**: Newsletter and article notifications

## 🛠️ Technical Stack

- **Framework**: Nuxt 3 with Vue 3 Composition API
- **Styling**: Tailwind CSS with custom components
- **State Management**: Pinia for global state
- **Type Safety**: TypeScript with strict configuration
- **Build Tool**: Vite for fast development and building
- **Deployment**: Static generation ready for CDN deployment

## 📱 Design Philosophy

- **Mobile-First**: Responsive design starting from mobile screens
- **Component Driven**: Reusable, composable component architecture
- **Performance First**: Optimized for Core Web Vitals
- **Accessibility**: WCAG compliant design patterns
- **Clean Code**: Readable, maintainable, and well-documented code