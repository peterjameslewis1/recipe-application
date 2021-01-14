import React, { useEffect, useState } from 'react';
import { newUserImage } from '../../../store/actionUser'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const UserImage = ({ props, user, newUserImage }) => {
    const [file, setFile] = useState('');
    const history = useHistory();

    const onChange = async e => {
        e.preventDefault();
        setFile(e.target.files[0])
    };

    const onSubmit = e => {
        e.preventDefault();
        const fd = new FormData()
        fd.append('file', file)
        newUserImage(fd)
    }
    return (
        <form onSubmit={onSubmit} className="file-upload">
            <p>{user.error ? user.error.message : ""}</p>
            <input type="file" onChange={onChange} />
            <button type="submit" >Upload</button>
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
        newUserImage: picture => dispatch(newUserImage(picture))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserImage);