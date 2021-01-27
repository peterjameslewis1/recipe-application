import React, { useState } from 'react';
import { newUserImage } from '../../../store/actionUser'
import { connect } from 'react-redux'

const UserImage = ({ user, newUserImage, setImage }) => {
    const [file, setFile] = useState('');
    const [error, setError] = useState('');

    const onChange = async e => {
        e.preventDefault();
        await setFile(e.target.files[0])
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (!file) return setError('No file selected')
        if (file) {
            if (file.size > 7000000) return setError('File size 7MB or smaller');
            const fd = await new FormData()
            await fd.append('file', file)
            await fd.append('id', user.user._id)
            await newUserImage(fd)
        }
        return;
    }
    return (
        <form onSubmit={onSubmit} className="file-upload" encType="multipart/form-data">
            <p>{error !== '' ? error : null}</p>
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