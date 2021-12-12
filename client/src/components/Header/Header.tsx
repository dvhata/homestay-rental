import './Header.scss';

import { Button, Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import userApi from '../../api/UserApi';
import { AuthToken } from '../../models/AuthToken/AuthToken';

export default function Header() {
  const [authToken, setAuthToken] = React.useState<AuthToken>();
  const token = localStorage.getItem("token");

  const login = authToken?.login;
  const username = authToken?.username;

  React.useEffect(() => {
    function fetchData() {
      userApi.authentication(token).then((result) => setAuthToken(result));
    }
    fetchData();
  }, [token]);

  return (
    <div className="header">
      <Row>
        <Col span={3}>
          <Link className="link" to="/">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAHGElEQVRogc2ae1CU1xnGf9+6u4KGyt1Yl8uCxlzUiAtemrbxFg0q1jSxjJeSMMbGNk3bNMkkbW0606ZN22QySU3q6GiU2ow1tGMnNiUOICRqvSEG1CImoBK5yGWB5bLCsrz94wO6Lgvs5YP2mXn/2HPOe97nOed8Z89NQTvEAYuBZGAGEA9EAHf05bcDTcBV4ApwFigAqjTk4DfMwMtAOSB+2mXg56jCxxyzgT8BPV6S9cacwGEgZSwETO4T0KuhAE/2fl+sUcF6oHmUBbiaFUjXUoAR2DWGAgSQ9enrpKn2C6m9XtHa3d78bk9n22PSaVsoNlukJ5L6EURMBP4GrPCnBQJBXGwsoaGTAL4EZIJk9gIY+ByY7l5+OCEhQC4wfxR4BoJgT4lDCTEC2fwfiHjiyadwOBysXbOapYsXdYdOmnTFF/8x/ybc7aUXnhOn3SZxsTHueTs8EdZ5SPsWsMUX1WOMrcBG90R3IZOBnWNCZwTodJ7aeADvAFNuK+9W4HUgVGNOPkFRFOJiY3ho2ZLhik0CXh0qcy6j/489pKWtXimfnj0p9tZGcdptA+bhG+m3XuB+T0L++r8SERUZKR3N9bcJ6LcYk2k434P95PuHlhl4ZKiuGm3EmKYSFBQ0KL2rq4uGxsbhXB9D3T4MCMnA8ww2Jii9eInzJSWD0g8czObWrVvDueqATQBKX0I5cJfWBH1BeFgYzzy9FUtSEk6nk8JPjrFj1266u7tHci0D7lWAWOC61sS+PGUKFksS0VFRNDVZqais5MLFS1qH6UccQCYafrgL58+T/CMfSk9n66APt6y0WJ7I2CSKomg9YWQAvK1VhT965mnpbm+Wxtoqee23v5aVqSvEkjRHHlq2RF564TkpKy0Wp90mh94/IEajUQAJCgqSzZmPS/HpE5Jimetv7LdAXeEGLCJj0wZx2m2S88EhCQ8L81jGYDDI737zK3HabZJ/5EPJ+eCQtNTXDPTY4kUP+hv/I4CKQEVEhIdL881qOXW8UIKCgjyWWbsmTVavShVAdmx/U5x2m7TU10hezmHparNKY22VTJgQ7C+Hz0A9oglISP9KdeH8eR7zExPM4rTbpKezVWJMJlEURabceacYjUb587494rTbpLL8kpimTvWXQ4Oe/547+Y3Uh5dTUXmVk6fPeMyvqa0j/2gBDkcPN+vrERFq6+pYtnQxBoMeh8NBjGkqYWGh3Kiu9odCyEhbXa+QYI6nqKh4yHy73c7yVd8YlF5ZeRWjwYjBYOCNt7YHPD0HPLTarTdl3+6dPvlkPv5t6WqzSlebVX75i22i0+kC4dCgB1qA8EBaQq/X43Q6ffKZPi0RvV5P8oKvcr6kNJDwAC06oDLQWvwREmMy0d7ewaelFwIND1ChQ11n+Q2dToeiKPT29vrkZzbHc/XaNUQkkPD9KNcB5wKpISpSPS9rbGry2mfcuHHcPeMuKioDHgz9OKcD8gOpIcGsHqJ/XuE9qQcWLiAsNJS8o4WBhHbFUR3q/YTfwyslxQJAWdllr33WpK1CRDj8j3/6G9YV/wZu9P94GT+nvoLcHGmouS56vd6r8hMnTpDqa5/JyWMFAU35LvZTV1XxqPcTPlUya+Z94uhokT+88brXPtt+8qI47TZZk7ZKCxE99O1FXJHtSyXBwcFy5l+fiK2xzus1kjk+TppvVsuxglyteuOAuwiAOXh5HJRgjpfjhXnitNskY9MGr4KGhNwhJUWnpKO5XixJc7QQ0Yt6c+YRWYDMS7bIo4+slfkpyZJgjpcEc7xYkubIxvXp8l7Wu2JvbZSuNqs8tWWzV0EjwsMlL+ewOO022bg+Xave2DOUCIBowFp8+oTHMyan3Sa2xjrJPrBf7rv3Hq8CJs9NkorLF6Wns1VefP7HWomwAlHDCQFYN31aopz4OH+AfGdLg+zbvVMWPfh1GT9+vFfBZs+aKQffyxJHR4tY625I2uqVWokQYIM7acU9oQ87FEXZuu7Rb7L1O5v52gNfQafT0d3dTVHxec6cLeJy+RWuV1XRbG1GURQiIiOIjooixTKXZUuXMH1aIg6Hg71Z+3nl1d9TXVMzUgN6i3eA73tb2ADk0NcCMSaTPP/sD+Xv2X+RLyrLhxx27nbi43xJun+2lj2Rh3oJNQhD9QioO8dcYIF7xuToaOLjYomIjOC7W55kZeoKenp6+OhILiUXLiAizJ45k9SHl6MoCt/7wbPs2ZvlbSMOhZPActQXFD5jIi4948l2/XG7nDt9XO65e8agvGmJCXLqeKHs37tbi54I8UeAK4yo111aDhFf7G3Uoa4Z0lGnvbES0ASs01KAK8JRT/V8Xpf5YL2oz0SiR0uEK2Yxeo9qLGMhwB1xwDbUPYG/Ai4BP0O9FfAbw02/viKGwQ/PIrn94Vkj6sOzctQt9lFcNkWB4D89pVlMzczKhwAAAABJRU5ErkJggg=="
              alt="error"
            />
          </Link>
        </Col>
        <Col className="navbar-group" span={15}>
          <Link className="link" to="/">
            Trang chủ
          </Link>
          <Link className="link" to="/apartment-type">
            Loại căn hộ
          </Link>
          <Link className="link" to="/apartment">
            Căn hộ
          </Link>
          <Link className="link" to="/ultility">
            Tiện ích
          </Link>
          <Link className="link" to="/contact">
            Liên hệ
          </Link>
        </Col>

        <Col className="navbar-group" span={5}>
          <div>
            {!login && (
              <>
                {" "}
                <Link className="link" to="/register">
                Đăng ký
                </Link>
                <Button className="button-link" type="dashed">
                  <Link className="link" to="/login">
                    Đăng nhập
                  </Link>
                </Button>
              </>
            )}
            {login && (
              <>
                {" "}
                <Link className="link" to="/profile">
                  Xin chao, {username}!
                </Link>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
