import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div>
      <h2>
        잘못된 접근입니다
      </h2>
      <Link href="/">
        <h2>
          홈으로 돌아가기
        </h2>
      </Link>
    </div>
  );
}
