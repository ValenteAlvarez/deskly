import TicketCard from "@/components/tickets/ticket-card/ticket-card";
import { TicketRead } from "@/lib/types";

const testTicket: TicketRead  = {
	id: "12341234",
	title: "Ticket title",
	description: 'Hello! ipsum dolor sit amet consectetur adipisicing elit. Totam, harum saepe! Excepturi cumque fugit laudantium temporibus fuga aut corrupti quod harum recusandae dolores placeat exercitationem mollitia, libero reiciendis ducimus quibusdam officia provident, error unde eligendi veniam quos. Animi, voluptas odio dignissimos impedit expedita molestias, itaque autem saepe dolor labore iure sed alias voluptates ipsa totam nobis. Modi vitae harum ratione sequi similique voluptatum id ipsum, sunt, quasi ipsam vel explicabo possimus et dolorem nulla sit asperiores atque laborum voluptate saepe laboriosam quis totam aut eum. Dignissimos atque incidunt iusto amet nobis asperiores doloremque rerum unde ducimus quasi libero illo ut voluptas mollitia fuga animi dolore laborum maiores, officia consectetur. Ea consequuntur dolorem officia suscipit voluptates, adipisci ipsa, nulla molestias officiis eveniet itaque repudiandae id aliquam earum obcaecati optio? Fugit odit explicabo veritatis. Iusto velit reprehenderit soluta ab, laborum provident facere nihil ratione expedita voluptatem odio ullam repellat suscipit labore eaque deserunt temporibus nisi ad! Temporibus, magnam cumque placeat voluptatum nesciunt inventore libero culpa veritatis quidem, rerum commodi perspiciatis laborum. Deserunt tenetur ullam voluptates necessitatibus, architecto est corrupti eveniet quae sunt itaque sequi, ratione quibusdam fugiat perferendis laborum, consequuntur dolores eum ducimus alias porro dignissimos? Officia earum nulla quos quis. Exercitationem.',
	priority: "medium",
	state: "open",
	assigned_to: null,
	created_at: "",
	updated_at: "",
	comments: []
}

export default function Home() {
  return (
    <div className={`main-wrapper`}>
      <main>
		<TicketCard ticket={testTicket}/>
      </main>
    </div>
  );
}
