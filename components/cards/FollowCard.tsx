interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

const FollowCard = ({id, name, username, imgUrl, personType }: Props) => {

  return (
      <article className="user-card">
          <div className="user-card_avatar ">
              <img
                  src={imgUrl}
                  alt="logo"
                  width={30}
                  height={30}
                  className="rounded-full w-10 h-10 "
              />
              <div className="flex-1 text-ellipsis">
                  <h4 className=" text-small-semibold">{name}</h4>
                  <p className="text-small-regular text-gray-1">@{username}</p>
              </div>
          </div>
         
      </article>
  )
}

export default FollowCard;
