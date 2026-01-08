# Article Challenge - Nuxt 3 Application

A modern, responsive article browsing application built with Nuxt 3, featuring server-side rendering, TypeScript, and a clean component architecture.

## 🌐 Live Demo

**Deployed Application**: [https://article-challenge-eight.vercel.app/](https://article-challenge-eight.vercel.app/)

## 📋 Requirements

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher

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
│       ├── LoadingSkeleton.vue
│       ├── ErrorMessage.vue
│       ├── EmptyState.vue
│       └── OfflineState.vue
├── composables/
│   └── useAPI.ts        # Centralized API communication
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
- **SSR Compatible**: Uses Nuxt's `useFetch` for optimal server-side rendering

### Composables Pattern
- **useAPI**: Low-level API communication
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
  url: string
  // ... raw API fields
}

// Domain Models - UI-optimized
interface Article {
  id: string
  title: string
  formattedDate: string  // Pre-formatted for display
  formattedContent: string // HTML-ready content
  url: string // External article URL
  // ... UI-friendly fields
}
```

### Key Decisions
- **Strict TypeScript**: No `any` types throughout the application
- **Model Transformation**: API responses transformed to UI-friendly domain models
- **Enum Usage**: LoadingState enum for consistent state management
- **Interface Segregation**: Separate interfaces for different concerns
- **Pre-formatting**: All display data formatted during mapping

## 🛡️ Error Handling & Offline Support

### Multi-Layer Strategy
1. **API Level**: Catch network/server errors, transform to user messages
2. **Store Level**: Handle business logic errors, update error state
3. **Component Level**: Display appropriate error UI with fallback states
4. **Global**: Prevent app crashes with graceful degradation

### Offline Experience
- **Network Detection**: Automatic online/offline status monitoring
- **Unified Offline UI**: Consistent slashed WiFi icon and messaging
- **Retry Functionality**: "Try Again" buttons throughout the app
- **Graceful Degradation**: App remains functional with cached data

### Error States
- **Loading States**: Skeleton loaders matching actual content layout
- **Empty States**: Offline message with retry option
- **Error States**: Clear error messages with retry functionality
- **Network Issues**: Unified offline experience across all pages

## 🎯 Key Features Implemented

- ✅ **Responsive Design**: Mobile-first with grid/list view modes
- ✅ **Search Functionality**: Real-time filtering across title, content, author
- ✅ **View Modes**: Grid (multiple columns) and List (single column) layouts
- ✅ **SSR Optimized**: Server-side rendering for better SEO and performance
- ✅ **Type Safety**: Full TypeScript coverage with strict typing
- ✅ **Error Boundaries**: Comprehensive error handling at all levels
- ✅ **Loading States**: Skeleton loaders matching content structure
- ✅ **Image Optimization**: Fallback placeholders for missing images
- ✅ **Accessibility**: WCAG compliant design patterns with focus management
- ✅ **Offline Support**: Network status detection with retry functionality
- ✅ **External Links**: Read more buttons open original article URLs
- ✅ **Time Formatting**: "5m ago" style timestamps
- ✅ **Pre-formatted Data**: All display content processed during API mapping

## 🔍 Technical Implementation Details

### Click Behavior
- **Card Click**: Navigates to internal article detail page
- **Read More Button**: Opens external article URL in new tab
- **Event Handling**: Proper event stopping to prevent conflicts

### Data Flow
1. **API Response**: Raw data from external news API
2. **Transformation**: Convert to UI-optimized domain models
3. **Pre-formatting**: Process all display content (dates, HTML, etc.)
4. **Caching**: Store in Pinia for performance
5. **Display**: Components use pre-formatted data

### Offline Handling
- **Detection**: `navigator.onLine` API with event listeners
- **UI States**: Consistent offline messaging across all components
- **Retry Logic**: Reload data when connection restored
- **Fallbacks**: Graceful degradation with cached content

## 🔍 Assumptions Made

1. **API Structure**: External news API with standard article fields including URLs
2. **Image Handling**: External image URLs with SVG fallback for missing images
3. **Date Format**: ISO date strings from API, formatted to relative time
4. **Search Scope**: Search across title, excerpt, author, and category fields
5. **Pagination**: Client-side pagination for demo purposes
6. **Browser Support**: Modern browsers with ES6+ support and online/offline detection
7. **Network**: Intermittent connectivity expected, offline support required

## 🚧 What I Would Improve With More Time

### Performance Optimizations
- **Virtual Scrolling**: For large article lists
- **Image Lazy Loading**: Intersection Observer for better performance
- **Bundle Splitting**: Code splitting for better initial load times
- **Caching Strategy**: Implement proper cache invalidation
- **Server-Side Pagination**: Move pagination logic to backend
- **Server-Side Search**: Backend search with indexing
- **Service Worker**: Advanced offline caching strategies

### User Experience
- **Advanced Search**: Filters by category, date range, author
- **Bookmarking**: Save favorite articles locally with sync
- **Reading Progress**: Track reading position across devices
- **Multiple Themes**: Light, dark, and custom theme support
- **Social Sharing**: Share articles on social platforms
- **Comments System**: User engagement through comments
- **Related Articles**: AI-powered article recommendations
- **Reading Time Estimation**: Calculate and display estimated reading time
- **Push Notifications**: Real-time article updates

### Technical Improvements
- **Component Library**: Integrate established UI library (Headless UI, Radix Vue)
- **Icon System**: Consistent icon library (Heroicons, Lucide)
- **Environment Variables**: Proper env config for different environments
- **Typography System**: Consistent typography scale
- **Unit Testing**: Comprehensive test suite with Vitest
- **E2E Testing**: Playwright for end-to-end testing
- **Accessibility Tools**: Automated accessibility testing
- **SEO Enhancement**: Meta tags, Open Graph, structured data
- **Performance Monitoring**: Core Web Vitals tracking
- **Error Tracking**: Integration with error monitoring service
- **Analytics Integration**: User behavior tracking
- **Content Management**: Admin panel for content creators
- **Image Optimization**: WebP/AVIF format support

### Architecture Enhancements
- **Micro-frontends**: Scalable architecture for larger teams
- **API Versioning**: Handle multiple API versions gracefully
- **Internationalization**: Multi-language support
- **Advanced State Management**: Optimistic updates, background sync
- **Database Integration**: PostgreSQL/MongoDB for robust data storage
- **Authentication System**: User accounts and personalization
- **Content Delivery Network**: Global content distribution
- **Progressive Web App**: Native app-like experience
- **Real-time Features**: Live notifications and updates
- **Email Subscriptions**: Newsletter and article notifications

## 🛠️ Technical Stack

- **Framework**: Nuxt 3 with Vue 3 Composition API
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS with custom components
- **State Management**: Pinia for global state
- **Data Fetching**: Native useFetch for SSR compatibility
- **Build Tool**: Vite for fast development and building
- **Deployment**: Static generation ready for CDN deployment

## 📱 Design Philosophy

- **Mobile-First**: Responsive design starting from mobile screens
- **Component Driven**: Reusable, composable component architecture
- **Performance First**: Optimized for Core Web Vitals
- **Accessibility**: WCAG compliant design patterns
- **Offline First**: Graceful degradation and network resilience
- **Clean Code**: Readable, maintainable, and well-documented code
- **Type Safety**: Strict TypeScript throughout the application