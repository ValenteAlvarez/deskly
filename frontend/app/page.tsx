import styles from './page.module.scss'
import ActionSidebar from "@/components/dashboard/action-sidebar/action-sidebar";
import GridView from '@/components/dashboard/gird-view/grid-view';
import DashboardHeader from '@/components/dashboard/header/header';

export default function Home({}) {
	return (
      <div className={styles['wrapper']}>
		<ActionSidebar/>
		<main className={styles['main-content']}>
			<DashboardHeader/>
			<GridView/>
		</main>
      </div>
  );
}
