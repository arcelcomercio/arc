import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const DefaultLayout = props => {
	return (
		<Fragment>
			<div>
				<header>
					{props.children[0]}
				</header>
			</div>
			<div>
				<div>
					{props.children[1]}
				</div>
				<section>
					<article>
						{props.children[2]}
					</article>

					<aside>
						{props.children[3]}
					</aside>
				</section>

				<footer>
					{props.children[4]}
				</footer>
			</div>
		</Fragment>
	);
};

DefaultLayout.propTypes = {
	children: PropTypes.node
};

DefaultLayout.sections = ['header', 'top-furniture', 'main', 'sidebar', 'footer'];

export default DefaultLayout;
