// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import ProjectCard from '@/components/ProjectCard';

// The screenshot preview modal is the one piece of real interactive behaviour on
// the projects page, and narrowing the `image` prop touches its code path
// directly. These tests pin open/close, the focus trap and the scroll lock so a
// payload optimisation cannot quietly break them.

const IMAGE = { src: '/_next/static/media/example.png', width: 1600, height: 1000 };

function renderCard(overrides: Partial<Parameters<typeof ProjectCard>[0]> = {}) {
  return render(
    <ProjectCard
      delay={0}
      description="A project used in tests."
      developedAt="Developed at"
      image={IMAGE}
      org="Lutra Labs"
      orgUrl="https://lutralabs.io"
      readMore="Read more"
      showLess="Show less"
      tags={['identity']}
      tagsLabel="Tags"
      title="Test Project"
      {...overrides}
    />
  );
}

afterEach(cleanup);

describe('ProjectCard preview modal', () => {
  it('renders the thumbnail as a button that opens the preview', async () => {
    const user = userEvent.setup();
    renderCard();

    expect(screen.queryByRole('dialog')).toBeNull();

    await user.click(
      screen.getByRole('button', { name: /open full-size screenshot preview for test project/i })
    );

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    renderCard();

    await user.click(screen.getByRole('button', { name: /open full-size screenshot preview/i }));
    await screen.findByRole('dialog');

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  it('closes when the close button is used', async () => {
    const user = userEvent.setup();
    renderCard();

    await user.click(screen.getByRole('button', { name: /open full-size screenshot preview/i }));
    await screen.findByRole('dialog');

    await user.click(screen.getByRole('button', { name: /close test project screenshot preview/i }));

    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  it('locks body scroll while open and restores it on close', async () => {
    const user = userEvent.setup();
    renderCard();

    const before = document.body.style.overflow;

    await user.click(screen.getByRole('button', { name: /open full-size screenshot preview/i }));
    await screen.findByRole('dialog');
    expect(document.body.style.overflow).toBe('hidden');

    await user.keyboard('{Escape}');
    await waitFor(() => expect(document.body.style.overflow).toBe(before));
  });

  it('traps focus on the close button', async () => {
    const user = userEvent.setup();
    renderCard();

    await user.click(screen.getByRole('button', { name: /open full-size screenshot preview/i }));
    await screen.findByRole('dialog');

    const close = screen.getByRole('button', { name: /close test project screenshot preview/i });
    await waitFor(() => expect(close).toHaveFocus());

    await user.tab();
    expect(close).toHaveFocus();
  });

  it('renders the preview image at the intrinsic size carried by the prop', async () => {
    const user = userEvent.setup();
    renderCard();

    await user.click(screen.getByRole('button', { name: /open full-size screenshot preview/i }));
    const dialog = await screen.findByRole('dialog');

    // Regression guard for the narrowed image prop: next/image throws when a
    // string src arrives without width/height and without `fill`.
    const img = dialog.querySelector('img');
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute('width', String(IMAGE.width));
    expect(img).toHaveAttribute('height', String(IMAGE.height));
  });

  it('falls back to a monogram and renders no preview button without an image', () => {
    renderCard({ image: undefined });

    expect(screen.queryByRole('button', { name: /open full-size screenshot preview/i })).toBeNull();
    expect(screen.getByText('TP')).toBeInTheDocument();
  });
});
