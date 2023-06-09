import { useState, useRef } from "react";
import { Input, FileGallery, PopupMenu, Textarea, Button, DropdownMenu, ErrorMessages } from "@components";
import { difficultyOptions, typeOptions, variantOptions } from "@config/dropdownMenus";
import { FileProvider } from "@context/FileContextProvider";
import { useTrickContext } from "@hooks/useTrickContext";
import validateForm from "@config/validation/validateForm";
import axios from "@config/axios";
import "./addTrickForm.scss";

// TODO add error handling and displaying

const AddTrickForm = ({ setCreateTrickMenuOpen }) => {
    const { createTrick } = useTrickContext();

    const topRef = useRef();

    const trickFormInitialState = {
        name: "",
        description: "",
        thumbnail: "",
        difficulty: "",
        type: "",
        variant: "",
        matchingTricks: [],
    };

    const [fileGalleryMenuOpen, setFileGalleryMenuOpen] = useState(false);
    const [trickFormData, setTrickFormData] = useState(trickFormInitialState);
    const [trickFormErrors, setTrickFormErrors] = useState({});
    const [trickFormMessage, setTrickFormMessage] = useState(null);

    const handleTrickTagsChange = (selectedOption, name) => {
        setTrickFormData({ ...trickFormData, [name]: selectedOption });
    };

    const handleTrickThumbnailChange = (file) => {
        const { filename } = file;

        setTrickFormData({ ...trickFormData, thumbnail: filename });
        setFileGalleryMenuOpen(false);
    };

    const handleTrickFormChange = (e) => {
        const { name, value } = e.target;

        setTrickFormData({
            ...trickFormData,
            [name]: value,
        });
    };

    const handleTrickFormSubmit = async (e) => {
        e.preventDefault();

        const response = await createTrick(trickFormData);

        if (response.status === "OK") {
            setTimeout(() => {
                setCreateTrickMenuOpen(false);
                setTrickFormData(trickFormInitialState);
            }, 1000);
        }
    };

    return (
        <form className="add-trick-form" noValidate onSubmit={handleTrickFormSubmit}>
            <fieldset>
                <legend>Algemene informatie</legend>
                <div className="add-trick-form__row">
                    <div className="add-trick-form__group add-trick-form__group--full-width">
                        <label htmlFor="">Naam</label>
                        <Input
                            type="text"
                            id="addTrickName"
                            name="name"
                            placeholder="voorbeeld: Heelside backside 360"
                            value={trickFormData.name}
                            onChange={handleTrickFormChange}
                        />
                        <div className="add-trick-form__group-tooltip">
                            <p>Probeer een korte maar duidelijke naam in te vullen. Let hierbij op volgende dingen:</p>
                            <div className="add-trick-form__naming-conventions">
                                <p>Heelside / Toeside (wrapped?) aansnijden</p>
                                <p>Frontside / Backside rotatie</p>
                                <p>Blind / Handle pass landing</p>
                                <p>Grabs (hoeveel?) (waar?)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="add-trick-form__row">
                    <div className="add-trick-form__group add-trick-form__group--full-width">
                        <label htmlFor="">Beschrijving</label>
                        <Textarea
                            id="addTrickDescription"
                            name="description"
                            placeholder="Schrijf een beschrijving"
                            value={trickFormData.description}
                            onChange={handleTrickFormChange}
                        />
                        <div className="add-trick-form__group-tooltip">
                            <p>
                                Geef een duidelijke beschrijving over de trick. Waarom leer je deze trick bv: progressie naar een moeilijkere variant.
                                Waar moet je op letten als je hem wilt leren. Tips die je kan volgen om er naar op te bouwen. Wees specifiek.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="add-trick-form__row">
                    <div className="add-trick-form__group">
                        <label htmlFor="">Foto</label>
                        {trickFormData.thumbnail && (
                            <div className="add-trick-form__trick-thumbnail">
                                <img src={`http://localhost:3000/api/files/${trickFormData.thumbnail}`} alt="trick thumbnail" />
                            </div>
                        )}
                        <Button type="primary" onClick={() => setFileGalleryMenuOpen(true)}>
                            Kies een bestand
                            <img src="/icons/upload-dark.svg" alt="upload icon" />
                        </Button>
                    </div>
                    <FileProvider>
                        <PopupMenu title="Bestand galerij" open={fileGalleryMenuOpen} setOpen={setFileGalleryMenuOpen}>
                            <FileGallery onFileChange={handleTrickThumbnailChange} />
                        </PopupMenu>
                    </FileProvider>
                </div>
            </fieldset>
            <fieldset>
                <legend>Tags</legend>
                <div className="add-trick-form__row">
                    <div className="add-trick-form__group">
                        <label htmlFor="">Moeilijkheidsgraad</label>
                        <DropdownMenu type="stretched" options={difficultyOptions} onOptionChange={handleTrickTagsChange} name="difficulty" />
                    </div>
                    <div className="add-trick-form__group">
                        <label htmlFor="">Type</label>
                        <DropdownMenu type="stretched" options={typeOptions} onOptionChange={handleTrickTagsChange} name="type" />
                    </div>
                    <div className="add-trick-form__group">
                        <label htmlFor="">Soort</label>
                        <DropdownMenu type="stretched" options={variantOptions} onOptionChange={handleTrickTagsChange} name="variant" />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend>Vergelijkbare Tricks</legend>
                <div className="add-trick-form__row">
                    <div className="add-trick-form__group add-trick-form__group--full-width">
                        <Input type="text" placeholder="Zoek naar vergelijkbare tricks">
                            <img className="input__icon" src="/icons/searchglass.svg" alt="searchglass icon" />
                        </Input>
                        <ul className="add-trick-form__comparable-tricks-list">
                            <li className="add-trick-form__comparable-trick">
                                <p className="add-trick-form__comparable-trick-tag">Backroll</p>
                            </li>
                            <li className="add-trick-form__comparable-trick">
                                <p className="add-trick-form__comparable-trick-tag">Rayley</p>
                            </li>
                            <li className="add-trick-form__comparable-trick">
                                <p className="add-trick-form__comparable-trick-tag">Heelside frontside 360</p>
                            </li>
                            <li className="add-trick-form__comparable-trick">
                                <p className="add-trick-form__comparable-trick-tag">Nosegrab crow mobe</p>
                            </li>
                            <li className="add-trick-form__comparable-trick">
                                <p className="add-trick-form__comparable-trick-tag">Back mode 540</p>
                            </li>
                            <li className="add-trick-form__comparable-trick">
                                <p className="add-trick-form__comparable-trick-tag">Pete rose</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </fieldset>
            <div className="add-trick-form__submit">
                <Button submit={true} type="primary">
                    <img src="/icons/plus-dark.svg" alt="plus icon" />
                    Toevoegen
                </Button>
            </div>
        </form>
    );
};

export default AddTrickForm;
