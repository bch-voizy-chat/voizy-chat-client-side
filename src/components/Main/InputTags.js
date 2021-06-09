import React, { useState } from "react";
import { Form } from "react-bootstrap";

const InputTags = ({ tags, setTags }) => {
	let tagList = tags.map((tag, index) => {
		return (
			<li key={index} className='d-flex align-items-center input-tag__tag'>
				{tag}
				<button
					type='button'
					onClick={() => removeTag(index)}
					className='input-tag__remove-btn'
				>
					<span className='visually-hidden'>Remove tag</span>
					<span aria-hidden className='input-tag__remove-btn__text'>
						+
					</span>
				</button>
			</li>
		);
	});

	return (
		<Form.Group controlId='audioTags'>
			<Form.Label>Enter tags</Form.Label>

			<Form.Control
				type='text'
				onKeyDown={keyDownHandler}
				className='input-tag__tags__input'
			/>
			<Form.Text className='text-muted'>
				{error ? (
					<span className='text-danger'>{error}</span>
				) : (
					"Press ENTER to add tag"
				)}
			</Form.Text>
			<ul className='d-flex align-items-center flex-wrap input-tag__tags'>
				{tagList}
			</ul>
		</Form.Group>
	);
};

export default InputTags;
