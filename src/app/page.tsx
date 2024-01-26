import Image from "next/image";
import styles from "./page.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      App Page. <Link href="/main/sample">Sample</Link>
    </main>
  );
}
