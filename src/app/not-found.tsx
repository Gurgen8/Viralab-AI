import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <p className="text-gradient text-7xl font-semibold tracking-tight">404</p>
        <h1 className="mt-4 text-xl font-semibold text-white">Страница не найдена</h1>
        <p className="mt-2 text-sm text-zinc-500">Похоже, этот ролик ещё не снят.</p>
        <ButtonLink href="/" className="mt-8">На главную</ButtonLink>
      </div>
    </main>
  );
}
