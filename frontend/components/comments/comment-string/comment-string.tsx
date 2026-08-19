type CommentStringProps = {
	comments: string[]
}
export function CommentString({comments}: CommentStringProps) {
	return (
		<>
			<h2>Comments:</h2>
			<ul>
				{comments.map((comment, index) => (
				<li key={index}>{comment}</li>
				))}
			</ul>
		</>
	)
}