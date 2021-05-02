import { useEffect, useState } from "react";
import "../styles/Plants.css";
import {
	Card,
	CardBody,
	Button,
	Spinner,
	Popover,
	PopoverHeader,
	PopoverTitle,
	PopoverBody,
	// OverlayTrigger,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function Plants() {
	//Get arrays of plants from API
	const [currentPlants, setPlants] = useState([]);
	//Get a specific plant from those arrays
	const [selectedPlant, setSelectedPlant] = useState(null);
	//set a url to
	const [searchUrl, setSearchUrl] = useState(``);
	//Toggle popover when "See it "button is clicked
	const [popoverOpen, setPopoverOpen] = useState(false);
	//Toggle popover open and closed when user clicks outside of popover
	const [clicked, setClicked] = useState(false);

	const pageNumber = Math.floor(Math.random() * (2 - 1 + 1) + 1);

	const toggle = () => setPopoverOpen(!popoverOpen);

	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
	}

	useEffect(() => {
		fetch(
			`https://trefle.io/api/v1/species?token=90K2RDOu4SjKZydHrMkwkiCX8jGzKv_sGUbHogjvASQ&page=${pageNumber}&filter_not[image_url]=null`
			// &filter[edible_part]=roots,leaves
		)
			.then((response) => response.json())
			.then((data) => {
				setPlants(data.data);
			});
	}, []);

	function convertToUrl(str) {
		// take input string and remove spaces and replace with +
		return str.replace(/\s/g, "+");

		//return new string
	}

	useEffect(() => {
		if (selectedPlant) {
			setSearchUrl(
				`https://www.google.com/search?q=${convertToUrl(
					selectedPlant.scientific_name
				)}`
			);
		}
	}, [selectedPlant]);

	function nextPlant() {
		setSelectedPlant(
			currentPlants[getRandomIntInclusive(0, currentPlants.length)]
		);
	}
	useEffect(() => {
		nextPlant();
	}, [currentPlants.length]);

	if (!selectedPlant) {
		return (
			<div id="spinner">
				<Spinner color="dark" />
			</div>
		);
	}

	function handleClickOutsidePopover() {
		setClicked(true);
		if (clicked === true) {
			setPopoverOpen(false);
		}
	}

	return (
		<div className="bodyContent" onClick={handleClickOutsidePopover}>
			<span></span>
			<Card className="Card">
				<CardBody>
					{/* <div className="card-body"> */}
					<div className="cardHeader">
						<h1>learn a plant</h1>
					</div>
					<hr id="hr" />
					<div className="texts">
						<h1 className="card-title commonNameHeader">
							{selectedPlant.common_name}
						</h1>
						<h2 className="card-subtitle mb-2 text-muted scientificNameHeader">
							{selectedPlant.scientific_name}
						</h2>
					</div>
					<div className="buttonLinks">
						<Button
							className="card-link"
							id="googleButton"
							href={searchUrl}
							target="_blank"
							rel="noreferrer"
						>
							Google it
						</Button>

						{/* <OverlayTrigger
						
							trigger="click"
							rootClose
							placement="right"
							overlay={overlay}
						> */}

						<Button className="card-link " id="popoverButton">
							See it
						</Button>
						{/* </OverlayTrigger> */}

						<Popover
							// style={{ width: "18rem" }}
							placement="right"
							isOpen={popoverOpen}
							target="popoverButton"
							toggle={toggle}
						>
							<PopoverHeader id="popoverTitle">
								{selectedPlant.common_name}
							</PopoverHeader>

							<PopoverBody id="popoverImg">
								<img
									className="plantImage"
									src={selectedPlant.image_url}
									alt="nothing-available-for-this-plant"
								/>
							</PopoverBody>
						</Popover>
					</div>

					<div>
						<Button id="nextButton" onClick={nextPlant}>
							Next Plant
						</Button>
					</div>
				</CardBody>
			</Card>
		</div>
	);
}

export default Plants;

// https://trefle.io/api/v1/plants?token=90K2RDOu4SjKZydHrMkwkiCX8jGzKv_sGUbHogjvASQ
// TOKEN: 90K2RDOu4SjKZydHrMkwkiCX8jGzKv_sGUbHogjvASQ
