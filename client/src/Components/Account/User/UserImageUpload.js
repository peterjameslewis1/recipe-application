import React, { useState } from 'react';
import { newUserImage } from '../../../store/actionUser'
import { connect } from 'react-redux'

const UserImage = ({ user, newUserImage, setImage }) => {
    const [file, setFile] = useState('');

    const onChange = async e => {
        e.preventDefault();
        await setFile(e.target.files[0])
    };

    const onSubmit = async e => {
        e.preventDefault();
        console.log(file)

        if (file) {
            const fd = await new FormData()
            await fd.append('file', file)
            await newUserImage(fd)
        }
        return;
    }
    return (
        <form onSubmit={onSubmit} className="file-upload" encType="multipart/form-data">
            <p>{user.error?.msg ? user.error.msg : ""}</p>
            <input type="file" onChange={onChange} />
            <div className="file-upload__btn">
                <button type="submit" className="submit">Upload</button>
                <button className="close" onClick={() => setImage(false)}>Close</button>
            </div>
        </form>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        newUserImage: image => dispatch(newUserImage(image))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserImage);