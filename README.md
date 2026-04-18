# fastcomments-nextjs

A fast, full-featured live commenting widget for [Next.js](https://nextjs.org), powered by [FastComments](https://fastcomments.com).

Works with the App Router and the Pages Router. All components are client components and can be dropped directly into a server component.

## Live Demo

Try every widget live at <https://fastcomments.com/commenting-system-for-nextjs>.

## Live Showcase

To see every component and flow running locally against the public `demo` tenant, clone the repo and run:

```bash
cd example
npm install
npm run dev
```

Each component has its own route under `example/app/` that you can copy straight into your own Next.js app.

## Install

```bash
npm install fastcomments-nextjs
```

## Quick Start

```tsx
// app/page.tsx
import { FastComments } from 'fastcomments-nextjs';

export default function Page() {
    return <FastComments tenantId="demo" />;
}
```

Replace `"demo"` with your FastComments tenant ID. The component already declares `'use client'`, so you can render it from a server component.

## Components

| Component | Description |
| --- | --- |
| `FastComments` | Commenting widget with replies, voting, and more |
| `FastCommentsCommentCount` | Displays comment count for a page |
| `FastCommentsImageChat` | Image annotation comments |
| `FastCommentsLiveChat` | Live chat widget |
| `FastCommentsCollabChat` | Collaborative inline commenting |
| `FastCommentsReviewsSummary` | Star-rating reviews summary |
| `FastCommentsUserActivityFeed` | User activity feed |

All components are exported from the package root:

```tsx
import {
    FastComments,
    FastCommentsLiveChat,
    FastCommentsReviewsSummary,
} from 'fastcomments-nextjs';
```

## Vercel Deployments

If you've installed FastComments through the Vercel Marketplace integration, your tenant ID is available as the `FASTCOMMENTS_TENANT_ID` environment variable. To read it on the client, expose it through `next.config.js` or prefix it with `NEXT_PUBLIC_`:

```tsx
<FastComments tenantId={process.env.NEXT_PUBLIC_FASTCOMMENTS_TENANT_ID!} />
```

## Example Project

A working demo is included in the `example/` directory:

```bash
cd example && npm install && npm run dev
```

## Links

- [FastComments Documentation](https://docs.fastcomments.com)
- [Customization & Configuration](https://docs.fastcomments.com/guide-customizations-and-configuration.html)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT

## Maintenance Status

These components are wrappers around our core VanillaJS components. We can automatically update these components (fix bugs, add features) without publishing this library, so while it may not be published for a while that does not mean FastComments is not under active development! Feel free to check [our blog](https://blog.fastcomments.com/) for updates. Breaking API changes or features will never be shipped to the underlying core library without a version bump in this library.
